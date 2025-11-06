import { Rocket } from "lucide-react";

export default function HeroHeader() {
  return (
    <header className="w-full">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-blue-600 text-white shadow-lg">
            <Rocket size={28} />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Gustavo Dutra
            </h1>
            <p className="mt-1 text-slate-600">
              Software Engineer — Backend, Data Platforms, and Machine Learning
            </p>
            <p className="mt-3 text-slate-700 max-w-3xl">
              I design and build scalable feature stores, streaming data systems, and
              production-grade ML infrastructure on cloud-native stacks (AWS + Kubernetes),
              serving tens of millions of users.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
