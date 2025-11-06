import HeroHeader from "./components/HeroHeader";
import ProfileViewer from "./components/ProfileViewer";
import JsonPlayground from "./components/JsonPlayground";
import MLPlayground from "./components/MLPlayground";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <HeroHeader />

      <main className="space-y-10 pb-16">
        <ProfileViewer />
        <JsonPlayground />
        <MLPlayground />
      </main>

      <footer className="border-t mt-10">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-slate-600">
          <p>
            Built for interactive backend exploration. The UI talks directly to
            the API using JSON, showcasing Gustavo's expertise across data platforms
            and ML systems.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
