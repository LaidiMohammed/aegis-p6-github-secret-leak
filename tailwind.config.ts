import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { git: "#0d1117", panel: "#161b22", violet: "#a78bfa", rose: "#fb7185", line: "#30363d" },
      fontFamily: { mono: ["JetBrains Mono", "Consolas", "monospace"], display: ["Inter", "Arial", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
