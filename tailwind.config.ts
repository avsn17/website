import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#171233",
        plum: "#2c1f4a",
        indigo: {
          deep: "#382a63",
          glow: "#5b46a8",
        },
        moss: {
          deep: "#173625",
          mid: "#245939",
          bright: "#3c8c5c",
        },
        firefly: "#ffd166",
        moonglow: "#8be8ff",
        petal: "#e6b3d9",
        parchment: "#efe7f7",
        muted: "#b6a9d6",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 18px 2px rgba(139, 232, 255, 0.35)",
        fireflyGlow: "0 0 14px 3px rgba(255, 209, 102, 0.45)",
      },
      backgroundImage: {
        twilight:
          "radial-gradient(ellipse at 20% 0%, #4a3873 0%, transparent 55%), radial-gradient(ellipse at 85% 15%, #35275c 0%, transparent 45%), linear-gradient(180deg, #171233 0%, #211a3d 55%, #14101f 100%)",
      },
    },
  },
  plugins: [],
};
export default config;

