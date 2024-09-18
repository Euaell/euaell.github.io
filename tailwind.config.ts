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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      theme: {
        extend: {
          keyframes: {
            fadeIn: {
              '0%': { opacity: 0 },
              '100%': { opacity: 1 },
            },
          },
          animation: {
            fadeIn: 'fadeIn 0.5s ease-in-out',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
