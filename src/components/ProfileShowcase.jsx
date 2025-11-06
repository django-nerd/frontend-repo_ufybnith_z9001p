import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, GraduationCap } from 'lucide-react';

const SectionCard = ({ title, icon: Icon, children }) => (
  <motion.div
    initial={{ y: 12, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ type: 'spring', stiffness: 120, damping: 16 }}
    className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur-md"
  >
    <div className="mb-3 flex items-center gap-2">
      <div className="rounded-lg bg-white/10 p-2 ring-1 ring-white/15">
        <Icon className="h-5 w-5 text-white/90" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    {children}
  </motion.div>
);

const ProfileShowcase = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL;
        const res = await fetch(`${base}/api/profile`);
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setProfile(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="text-white/80">Loading profile…</div>;
  if (error) return <div className="text-red-300">{error}</div>;
  if (!profile) return null;

  return (
    <section className="relative mx-auto -mt-20 max-w-6xl px-6">
      <div className="mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-white/90"
        >
          Profile Overview
        </motion.h2>
        <p className="mt-1 text-sm text-white/70">
          A quick, readable summary pulled live from the API.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <SectionCard title="About" icon={User}>
          <p className="text-sm leading-relaxed text-white/80">
            {profile.summary || 'Backend and ML engineer focused on reliable systems and delightful tooling.'}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(profile.skills || []).slice(0, 6).map((s, i) => (
              <span key={i} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
                {s}
              </span>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Experience" icon={Briefcase}>
          <ul className="space-y-3 text-sm">
            {(profile.experience || []).slice(0, 3).map((job, i) => (
              <li key={i} className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">
                <p className="font-medium text-white">{job.role} · {job.company}</p>
                <p className="text-xs text-white/70">{job.period}</p>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Education" icon={GraduationCap}>
          <ul className="space-y-3 text-sm">
            {(profile.education || []).map((ed, i) => (
              <li key={i} className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">
                <p className="font-medium text-white">{ed.degree}</p>
                <p className="text-xs text-white/70">{ed.institution}</p>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </section>
  );
};

export default ProfileShowcase;
