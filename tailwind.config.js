/** @type {import('tailwindcss').Config} */
// Utility layer di atas globals.css yang sudah ada (preflight OFF agar tidak merusak CSS lama).
const tokens = {
  bg: "#fdf9e9",
  surface: "#ffffff",
  ink: "#26331a",
  muted: "#5c6f45",
  line: "#e5e7c6",
  primary: "#47730d",
  accent: "#f2c11b",
  "accent-dark": "#92610a",
  badge: "#c2410c",
  star: "#b45309",
  success: "#166534",
  danger: "#c2410c",
  "glow-1": "#f8efcd",
  "glow-2": "#fcf6e2",
  "glow-3": "#fefaf0",
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
        card: "0 10px 30px -12px rgba(76, 82, 38, 0.16)",
        glow: "0 22px 44px -18px rgba(122, 98, 10, 0.35)",
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
