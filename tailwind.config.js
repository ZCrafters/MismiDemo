/** @type {import('tailwindcss').Config} */
// Utility layer di atas globals.css yang sudah ada (preflight OFF agar tidak merusak CSS lama).
const tokens = {
  bg: "#fff5f9",
  surface: "#ffffff",
  ink: "#3a1230",
  muted: "#7d3d68",
  line: "#f3d4e4",
  primary: "#b4135e",
  accent: "#d61380",
  "accent-dark": "#a6125c",
  badge: "#c2156e",
  star: "#d97706",
  success: "#15803d",
  danger: "#d6147a",
  "glow-1": "#ffe6f0",
  "glow-2": "#fff0f6",
  "glow-3": "#fff7fb",
};

module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: tokens,
      fontFamily: {
        body: ['"Outfit"', "system-ui", "sans-serif"],
        display: ['"Cabinet Grotesk"', '"Outfit"', "system-ui", "sans-serif"],
      },
      maxWidth: { wrap: "1400px" },
      borderRadius: { card: "14px" },
      boxShadow: {
        card: "0 10px 30px -12px rgba(180, 19, 94, 0.14)",
        glow: "0 22px 44px -18px rgba(214, 19, 128, 0.28)",
      },
      keyframes: {
        "float-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { opacity: "0.55" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "float-soft": "float-soft 5s ease-in-out infinite",
        shimmer: "shimmer 1.1s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
