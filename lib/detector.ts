const SECRET_PATTERNS: [RegExp, string][] = [
  [/DB_PASSWORD\s*=\s*["']([^"']{3,40})["']/gi, "DB_PASSWORD"],
  [/(?:GITHUB|GH)_TOKEN\s*[:=]\s*["']([a-f0-9]{40})["']/gi, "API_KEY_GITHUB"],
  [/(?:AWS_)?SECRET\s*[:=]\s*["']([a-zA-Z0-9/+]{16,40})["']/gi, "AWS_SECRET"],
];

export function scanRepo(content: string) {
  const findings: Array<{ type: string; match: string; position: number }> = [];
  for (const [re, type] of SECRET_PATTERNS) {
    let m: RegExpExecArray | null;
    re.lastIndex = 0;
    while ((m = re.exec(content)) !== null) {
      findings.push({ type, match: m[1].slice(0, 12) + "…", position: m.index });
    }
  }
  return {
    project: "P6",
    targets: ["wordpress/wordpress"],
    findings,
    method: "Scan regex local — secrets anonymisés (12 premiers caractères seulement)",
  };
}
