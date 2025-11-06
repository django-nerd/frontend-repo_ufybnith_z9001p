import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Gauge, Activity } from 'lucide-react';

const NumberField = ({ label, value, onChange, step = 1, min, max, helper }) => (
  <div className="space-y-1.5">
    <label className="flex items-center justify-between text-xs text-white/70">
      <span>{label}</span>
      {helper && <span className="text-[10px] text-white/50">{helper}</span>}
    </label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      step={step}
      min={min}
      max={max}
      className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white outline-none ring-0 placeholder:text-white/40 focus:border-fuchsia-400/50 focus:bg-white/10"
    />
  </div>
);

const Badge = ({ children, color = 'bg-emerald-500/20 text-emerald-300 ring-emerald-400/30' }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${color}`}>
    {children}
  </span>
);

const RiskGauge = ({ score }) => {
  const pct = Math.round(score * 100);
  const color = score < 0.33 ? '#34d399' : score < 0.66 ? '#f59e0b' : '#ef4444';
  return (
    <svg viewBox="0 0 120 60" className="w-full">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#34d399"/>
          <stop offset="50%" stopColor="#f59e0b"/>
          <stop offset="100%" stopColor="#ef4444"/>
        </linearGradient>
      </defs>
      <path d="M10,50 A50,50 0 0,1 110,50" fill="none" stroke="url(#g)" strokeWidth="12" strokeLinecap="round"/>
      <circle cx={10 + 100 * (pct/100)} cy="50" r="5" fill={color} />
    </svg>
  );
};

const MLRiskDemo = () => {
  const [features, setFeatures] = useState({
    income: 65000,
    age: 32,
    loan_amount: 15000,
    credit_history_years: 5,
    late_payments: 1,
    utilization: 0.32,
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const categoryColor = useMemo(() => {
    if (!result) return 'bg-white/10 text-white ring-white/20';
    if (result.category === 'low') return 'bg-emerald-500/20 text-emerald-300 ring-emerald-400/30';
    if (result.category === 'medium') return 'bg-amber-500/20 text-amber-300 ring-amber-400/30';
    return 'bg-rose-500/20 text-rose-300 ring-rose-400/30';
  }, [result]);

  const update = (key, value) => setFeatures((f) => ({ ...f, [key]: isNaN(value) ? 0 : value }));

  const predict = async () => {
    setLoading(true); setError(null);
    try {
      const base = import.meta.env.VITE_BACKEND_URL;
      const res = await fetch(`${base}/api/ml/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(features),
      });
      if (!res.ok) throw new Error('Failed to fetch prediction');
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative mx-auto mt-16 max-w-6xl px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Credit Risk Scoring</h2>
          <p className="text-sm text-white/70">Interactive, deterministic demo powered by the backend.</p>
        </div>
        {result && (
          <Badge color={categoryColor}>
            <Activity className="mr-1 h-3.5 w-3.5"/>
            {result.category.toUpperCase()} RISK
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="md:col-span-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <NumberField label="Annual Income" helper="$" value={features.income} onChange={(v) => update('income', v)} step={1000} min={0} />
            <NumberField label="Age" value={features.age} onChange={(v) => update('age', v)} min={18} max={99} />
            <NumberField label="Loan Amount" helper="$" value={features.loan_amount} onChange={(v) => update('loan_amount', v)} step={500} min={0} />
            <NumberField label="Credit History (years)" value={features.credit_history_years} onChange={(v) => update('credit_history_years', v)} min={0} />
            <NumberField label="Late Payments" value={features.late_payments} onChange={(v) => update('late_payments', v)} min={0} />
            <NumberField label="Utilization" helper="0-1" value={features.utilization} onChange={(v) => update('utilization', v)} step={0.01} min={0} max={1} />
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-xs text-white/60">Your inputs never leave this session except the single POST to the demo endpoint.</p>
            <button
              onClick={predict}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/25 transition hover:brightness-110 disabled:opacity-60"
            >
              <Gauge className="h-4 w-4" />
              {loading ? 'Scoring…' : 'Run Scoring'}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
        >
          <h3 className="mb-3 text-sm font-semibold text-white/90">Result</h3>
          {error && <div className="mb-3 rounded-md border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200">{error}</div>}
          {!result && !error && (
            <p className="text-sm text-white/70">Fill inputs and run scoring to see the risk profile.</p>
          )}
          {result && (
            <div>
              <RiskGauge score={result.score} />
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">
                  <p className="text-xs text-white/60">Score</p>
                  <p className="text-lg font-semibold text-white">{(result.score * 100).toFixed(1)}%</p>
                </div>
                <div className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">
                  <p className="text-xs text-white/60">Category</p>
                  <p className="text-lg font-semibold capitalize text-white">{result.category}</p>
                </div>
                <div className="col-span-2 rounded-lg bg-white/5 p-3 ring-1 ring-white/10">
                  <p className="text-xs text-white/60">Features (Echo)</p>
                  <pre className="mt-2 max-h-48 overflow-auto text-[11px] leading-relaxed text-white/80">{JSON.stringify(result.features, null, 2)}</pre>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default MLRiskDemo;
