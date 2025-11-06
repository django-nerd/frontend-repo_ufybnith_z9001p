import { useEffect, useState } from "react";

export default function ProfileViewer() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const backend = import.meta.env.VITE_BACKEND_URL || "";

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${backend}/api/profile`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        setError(String(e.message || e));
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [backend]);

  return (
    <section className="max-w-6xl mx-auto px-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-3">Profile JSON</h2>
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-4 py-2 bg-slate-50 border-b text-slate-600 text-sm">GET /api/profile</div>
        <div className="p-4 font-mono text-sm overflow-auto whitespace-pre-wrap">
          {loading && <span className="text-slate-500">Loading...</span>}
          {error && <span className="text-red-600">{error}</span>}
          {!loading && !error && (
            <pre className="text-slate-800">{JSON.stringify(data, null, 2)}</pre>
          )}
        </div>
      </div>
    </section>
  );
}
