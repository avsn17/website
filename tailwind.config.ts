import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        garden: {
          bg: "#1b3227",        // Deep forest background
          grass: "#2d533f",     // Soft painterly grass
          dirt: "#4a3525",      // Rich soil brown
          gnomeHat: "#c04a43",  // Terra-cotta gnome hat
          gnomeCoat: "#3d785a", // Earthy green tunic
          flower: "#a855f7",    // Gentle purple bloom
        },
        glow: {
          cyan: "#99ffff",      // Bright butterfly wing glow
          halo: "#52e3e1",      // Outer soft radiance
        },
      },
      boxShadow: {
        'butterfly-glow': '0 0 25px rgba(153, 255, 255, 0.6), 0 0 50px rgba(82, 227, 225, 0.3)',
      },
      animation: {
        'bounce-subtle': 'bounceSubtle 3s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(4px, -8px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
