import SecretScanner from "@/components/SecretScanner";
import Reveal from "@/components/Reveal";

const PATTERNS = [
  ["DB_PASSWORD", "DB_PASSWORD = '...' — mot de passe de base de données"],
  ["API_KEY_GITHUB", "GITHUB_TOKEN / GH_TOKEN — jeton 40 caractères hex"],
  ["AWS_SECRET", "AWS_SECRET / SECRET — clé secrète AWS (16-40 caractères)"],
];

export default function Page() {
  return (
    <main className="min-h-screen bg-git">
      <nav className="sticky top-0 z-40 border-b border-line bg-git/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded bg-violet font-mono text-xs font-bold text-git">P6</span><span className="coord text-slate-300">SECRET SCAN · GITHUB LEAKS</span></a>
          <div className="hidden gap-7 md:flex">{[["#scan","Scanner"],["#patterns","Patterns"],["#demo","Démo"],["#ethique","Éthique"]].map(([h,l])=><a key={h} href={h} className="coord text-slate-400 hover:text-violet">{l}</a>)}</div>
          <a href="https://github.com/LaidiMohammed/aegis-p6-github-secret-leak" target="_blank" rel="noreferrer" className="rounded border border-line px-3 py-1.5 font-mono text-[11px] text-slate-300 hover:border-violet hover:text-violet">GitHub ↗</a>
        </div>
      </nav>

      <section id="top" className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:py-20">
        <div>
          <Reveal><div className="mb-5 flex items-center gap-3"><span className="h-px w-12 bg-violet"/><span className="coord text-violet">Fiche technique · P6</span></div></Reveal>
          <Reveal delay={70}><h1 className="text-5xl font-bold leading-[1.03] sm:text-6xl">Fuites de<br/><span className="text-violet">secrets</span><br/>GitHub</h1></Reveal>
          <Reveal delay={140}><p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400">Surveillance des fuites de secrets dans des dépôts <b className="text-slate-200">open-source publics</b> : .env, config.php, secrets.yml — avec anonymisation systématique.</p></Reveal>
          <Reveal delay={210}><div className="mt-8 flex flex-wrap gap-3"><a href="#scan" className="rounded bg-violet px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-git hover:bg-white">Scanner ↓</a><a href="#patterns" className="rounded border border-line px-6 py-3 font-mono text-xs uppercase tracking-widest text-slate-300 hover:border-violet">Les patterns</a></div></Reveal>
          <Reveal delay={280}><div className="mt-10 grid grid-cols-4 gap-4 border-t border-line pt-6">{[["03","repos"],["03","patterns"],["09","tests"],["00","clé en clair"]].map(([n,l])=><div key={l}><div className="text-2xl font-bold text-white">{n}</div><div className="coord text-slate-500">{l}</div></div>)}</div></Reveal>
        </div>
        <Reveal delay={120}><SecretScanner /></Reveal>
      </section>

      <section id="patterns" className="mx-auto max-w-7xl px-5 py-14">
        <Reveal><span className="coord text-violet">01 / Patterns</span><h2 className="mt-2 text-4xl font-bold sm:text-5xl">Ce que cherche le scanner</h2></Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PATTERNS.map(([n,d],i)=><Reveal key={n} delay={i*70}><div className="rounded-lg border border-line bg-panel p-5"><span className="coord text-violet">0{i+1}</span><div className="mt-2 font-mono text-sm font-bold text-rose">{n}</div><p className="mt-2 text-xs leading-relaxed text-slate-400">{d}</p></div></Reveal>)}
        </div>
      </section>

      <section id="demo" className="mx-auto max-w-7xl px-5 py-14">
        <Reveal><span className="coord text-violet">02 / Démonstration</span><h2 className="mt-2 text-4xl font-bold sm:text-5xl">Commandes</h2></Reveal>
        <div className="mt-8 space-y-2 rounded-lg border border-line bg-panel p-5 text-xs">
          {["make smoke   # vérification CLI","make test    # 9 tests","python -m src.github_secret_leak_main --json"].map(c=><div key={c} className="rounded bg-git px-4 py-3 font-mono text-slate-300"><span className="text-violet">$</span> {c}</div>)}
        </div>
        <Reveal delay={100}><p className="mt-5 font-mono text-xs text-slate-500">[SUMMARY] findings=… · sources anonymisées (html_url), sans clé secrète en clair</p></Reveal>
      </section>

      <section id="ethique" className="mx-auto max-w-7xl px-5 py-14">
        <Reveal><span className="coord text-violet">03 / Éthique</span><h2 className="mt-2 text-4xl font-bold sm:text-5xl">Anonymisation</h2></Reveal>
        <div className="mt-6 rounded-lg border-l-2 border-violet bg-panel p-6"><p className="text-sm leading-relaxed text-slate-400">Cibles : dépôts publics autorisés (wordpress, nextcloud, apache-kafka). Le rapport ne contient que le <b className="text-slate-200">type de secret</b> et l'URL source — jamais la valeur en clair. Labo local, anti-GPU, anti-cloud.</p></div>
      </section>

      <footer className="border-t border-line bg-panel">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-5 py-10">
          <div><div className="text-2xl font-bold">P6 <span className="text-violet">/ SECRET SCAN</span></div><div className="coord mt-1 text-slate-500">Master 1 PFE · Laidi Mohammed · 2026</div></div>
          <div className="flex gap-5 font-mono text-xs text-slate-400"><a href="https://github.com/LaidiMohammed/aegis-p6-github-secret-leak" target="_blank" rel="noreferrer" className="hover:text-violet">GitHub ↗</a><a href="https://aegis-p6-github-secret-leak.vercel.app" className="hover:text-violet">Vercel ↗</a></div>
        </div>
      </footer>
    </main>
  );
}
