import { useState } from "react";

export default function JsonPlayground() {
  const backend = import.meta.env.VITE_BACKEND_URL || "";
  const [input, setInput] = useState(() => JSON.stringify({ hello: "world" }, null, 2));
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const send = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = JSON.parse(input);
      const res = await fetch(`${backend}/api/tools/echo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setOutput(json);
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-3">JSON Playground</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="px-4 py-2 bg-slate-50 border-b text-slate-600 text-sm">Request Body</div>
          <textarea
            className="w-full h-64 p-4 font-mono text-sm outline-none resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="p-3 border-t bg-slate-50 flex items-center gap-2">
            <button
              onClick={send}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send to Backend"}
            </button>
            {error && <span className="text-red-600 text-sm">{error}</span>}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-4 py-2 bg-slate-50 border-b text-slate-600 text-sm">Response</div>
          <div className="p-4 font-mono text-sm overflow-auto whitespace-pre-wrap min-h-[16rem]">
            {output ? (
              <pre className="text-slate-800">{JSON.stringify(output, null, 2)}</pre>
            ) : (
              <span className="text-slate-500">Send a request to see the response here.</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
