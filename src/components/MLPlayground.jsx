import { useState } from "react";

export default function MLPlayground() {
  const backend = import.meta.env.VITE_BACKEND_URL || "";
  const [form, setForm] = useState({
    income: 12000,
    debt: 3000,
    num_credit_lines: 4,
    missed_payments: 0,
    age: 32,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const predict = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${backend}/api/ml/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setResult(json);
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-3">ML Risk Scoring Demo</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="px-4 py-2 bg-slate-50 border-b text-slate-600 text-sm">Inputs</div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <LabeledInput label="Income" value={form.income} onChange={(v) => update("income", Number(v))} />
            <LabeledInput label="Debt" value={form.debt} onChange={(v) => update("debt", Number(v))} />
            <LabeledInput label="Credit Lines" value={form.num_credit_lines} onChange={(v) => update("num_credit_lines", Number(v))} />
            <LabeledInput label="Missed Payments" value={form.missed_payments} onChange={(v) => update("missed_payments", Number(v))} />
            <LabeledInput label="Age" value={form.age} onChange={(v) => update("age", Number(v))} />
          </div>
          <div className="p-3 border-t bg-slate-50 flex items-center gap-2">
            <button
              onClick={predict}
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Scoring..." : "Run Prediction"}
            </button>
            {error && <span className="text-red-600 text-sm">{error}</span>}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-4 py-2 bg-slate-50 border-b text-slate-600 text-sm">Result</div>
          <div className="p-4 font-mono text-sm overflow-auto whitespace-pre-wrap min-h-[16rem]">
            {result ? (
              <pre className="text-slate-800">{JSON.stringify(result, null, 2)}</pre>
            ) : (
              <span className="text-slate-500">Set inputs and run prediction.</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function LabeledInput({ label, value, onChange }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm text-slate-600">{label}</span>
      <input
        type="number"
        className="px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
