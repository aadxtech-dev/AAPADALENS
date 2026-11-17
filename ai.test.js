const test = require("node:test");
const assert = require("node:assert/strict");
const { Readable } = require("node:stream");
const Module = require("node:module");

let geminiCreate;
const originalLoad = Module._load;
Module._load = function (request, ...args) {
  if (request === "@google/genai") return { GoogleGenAI: class { constructor() { this.interactions = { create: (...params) => geminiCreate(...params) }; } } };
  if (request === "./backend") return { handleBackend: async () => false };
  return originalLoad.call(this, request, ...args);
};
const { handleApi } = require("../api");
Module._load = originalLoad;

const originalFetch = global.fetch;
const originalGroq = process.env.GROQ_API_KEY;
const originalGemini = process.env.GEMINI_API_KEY;
let remote = 0;
const prompt = { task: "chat", language: "en", messages: [{ role: "user", text: "Hello" }] };

async function request(path, body) {
  const req = Readable.from(body === undefined ? [] : [Buffer.from(JSON.stringify(body))]);
  req.method = body === undefined ? "GET" : "POST";
  req.socket = { remoteAddress: String(++remote) };
  let status, output;
  const res = { writeHead(code) { status = code; }, end(text) { output = JSON.parse(text); } };
  await handleApi(req, res, path, new URLSearchParams());
  return { status, body: output };
}

test.beforeEach(() => {
  process.env.GROQ_API_KEY = "test-groq";
  process.env.GEMINI_API_KEY = "test-gemini";
  geminiCreate = async () => { throw new Error("Unexpected Gemini call"); };
});
test.after(() => {
  global.fetch = originalFetch;
  if (originalGroq === undefined) delete process.env.GROQ_API_KEY; else process.env.GROQ_API_KEY = originalGroq;
  if (originalGemini === undefined) delete process.env.GEMINI_API_KEY; else process.env.GEMINI_API_KEY = originalGemini;
});

test("status recognizes either provider", async () => {
  delete process.env.GEMINI_API_KEY;
  assert.equal((await request("/api/status")).body.ai, true);
  delete process.env.GROQ_API_KEY;
  assert.equal((await request("/api/status")).body.ai, false);
  assert.equal((await request("/api/ai", prompt)).body.code, "AI_NOT_CONFIGURED");
});

test("Groq success and classification use the shared schema", async () => {
  let sent;
  global.fetch = async (url, options) => {
    assert.equal(url, "https://api.groq.com/openai/v1/chat/completions");
    sent = JSON.parse(options.body);
    return new Response(JSON.stringify({ choices: [{ message: { content: sent.response_format ? '{"category":"medical","urgency":"high","reason":"Needs care."}' : "Hello" } }] }), { status: 200 });
  };
  assert.deepEqual((await request("/api/ai", prompt)).body, { text: "Hello" });
  const result = await request("/api/ai", { task: "classify", text: "Needs care" });
  assert.equal(result.status, 200);
  assert.equal(result.body.urgency, "high");
  assert.equal(sent.response_format.json_schema.strict, true);
  assert.deepEqual(sent.response_format.json_schema.schema.required, ["category", "urgency", "reason"]);
});

test("transient Groq failures fall back once and preserve Gemini privacy settings", async () => {
  for (const status of [429, 503]) {
    let groqCalls = 0, geminiCalls = 0;
    global.fetch = async () => { groqCalls++; return new Response("", { status }); };
    geminiCreate = async (body, options) => {
      geminiCalls++;
      assert.equal(body.store, false);
      assert.equal(options.retries.strategy, "none");
      return { output_text: "Fallback response" };
    };
    const result = await request("/api/ai", prompt);
    assert.equal(result.body.text, "Fallback response");
    assert.equal(groqCalls, 1);
    assert.equal(geminiCalls, 1);
  }
});

test("authentication errors do not fall back or leak provider messages", async () => {
  global.fetch = async () => new Response("sensitive provider detail", { status: 401 });
  const result = await request("/api/ai", prompt);
  assert.equal(result.status, 502);
  assert.equal(result.body.code, "AI_AUTH");
  assert.equal(JSON.stringify(result.body).includes("sensitive"), false);
});

test("invalid classifications and empty responses do not report success", async () => {
  global.fetch = async () => new Response(JSON.stringify({ choices: [{ message: { content: '{"category":"medical","urgency":"wrong","reason":"x"}' } }] }), { status: 200 });
  assert.equal((await request("/api/ai", { task: "classify", text: "test" })).status, 502);
  global.fetch = async () => new Response(JSON.stringify({ choices: [{ message: { content: "" } }] }), { status: 200 });
  assert.equal((await request("/api/ai", prompt)).body.code, "AI_ERROR");
});

test("Gemini remains usable alone", async () => {
  delete process.env.GROQ_API_KEY;
  geminiCreate = async (body, options) => {
    assert.equal(body.store, false);
    assert.equal(options.retries.strategy, "none");
    return { output_text: "Gemini response" };
  };
  assert.equal((await request("/api/ai", prompt)).body.text, "Gemini response");
});
