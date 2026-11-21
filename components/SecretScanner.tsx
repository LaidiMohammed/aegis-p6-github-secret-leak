"use client";
import { useState } from "react";

const FINDINGS = [
  { type: "DB_PASSWORD", file: "config.php", repo: "wordpress/wordpress" },
  { type: "API_KEY_GITHUB", file: ".env.local", repo: "nextcloud/server" },
  { type: "AWS_SECRET", file: "secrets.yml", repo: "apache/kafka" },
];

export default function SecretScanner() {
  const [scan, setScan] = useState(false);
  return (
    <div className="code-panel">
      <div className="flex items-center justify-between border-b border-line bg-panel px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose" /><span className="h-3 w-3 rounded-full bg-violet" /><span className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="ml-2 coord text-slate-400">github_secret_scanner</span>
        </div>
        <span className="coord text-violet">3 repos publics</span>
      </div>
      <div className="grid md:grid-cols-[150px_1fr]">
        <aside className="hidden border-r border-line bg-panel/50 p-3 md:block">
          <div className="coord text-slate-500 mb-2">CIBLES</div>
          {["wordpress/wordpress","nextcloud/server","apache/kafka"].map(r=><div key={r} className="font-mono text-[10px] text-slate-400 py-1 truncate">📦 {r}</div>)}
          <div className="coord text-slate-500 mt-4 mb-2">PATTERNS</div>
          {["DB_PASSWORD","API_KEY_GITHUB","AWS_SECRET"].map(p=><div key={p} className="font-mono text-[10px] text-violet py-1 truncate">{p}</div>)}
        </aside>
        <div className="p-4">
          <div className="mb-3 flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="text-violet">●</span> config.php <span className="text-slate-600">· detecté</span>
          </div>
          <div className="rounded bg-[#0d1117]">
            <div className="dl text-slate-500">1 &nbsp; &lt;?php</div>
            <div className="dl text-slate-400">2 &nbsp; $db_host = <span className="text-emerald-400">'localhost'</span>;</div>
            <div className={`dl add ${scan ? "" : ""}`}>
              3 &nbsp; $db_pass = <span className={scan ? "secret" : "text-amber-300"}>'REDACTED_EXAMPLE'</span>;
            </div>
            <div className="dl text-slate-400">4 &nbsp; $db_user = <span className="text-emerald-400">'wp_user'</span>;</div>
          </div>

          {scan && (
            <div className="mt-4 space-y-2">
              {FINDINGS.map((f,i)=>(
                <div key={f.type} className="flex flex-wrap items-center gap-2 rounded border border-rose/30 bg-rose/5 px-3 py-2 text-xs">
                  <span className="font-mono font-bold text-rose">0{i+1}</span>
                  <span className="font-mono text-violet">{f.type}</span>
                  <span className="font-mono text-slate-400">{f.repo} → {f.file}</span>
                </div>
              ))}
            </div>
          )}

          <button onClick={()=>setScan(!scan)} className="mt-5 w-full rounded bg-violet px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-git transition hover:bg-white">
            {scan ? "↺ Réinitialiser" : "▶ Scanner les dépôts"}
          </button>
          <p className="mt-2 text-center text-[10px] text-slate-500">secrets anonymisés dans le rapport · type seul, jamais la valeur en clair</p>
        </div>
      </div>
    </div>
  );
}
