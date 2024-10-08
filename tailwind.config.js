/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Adding custom keyframes for fadeIn, slideIn, and bubble float animations
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideIn: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        float: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
          "100%": { transform: "translateY(0)" },
        },
        // Optional: You can add more keyframes for various bubble effects
        bubblePulse: {
          "0%": { transform: "scale(1)", opacity: 0.7 },
          "50%": { transform: "scale(1.2)", opacity: 1 },
          "100%": { transform: "scale(1)", opacity: 0.7 },
        },
      },
      // Adding custom animations
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
        slideIn: "slideIn 0.8s ease-out",
        float: "float 6s ease-in-out infinite", // Added floating animation
        // Optional animation for bubble pulsing effect
        bubblePulse: "bubblePulse 3s ease-in-out infinite",
      },
      // Custom colors, spacing, or other utilities if needed
      colors: {
        darkGray: "#1f2937", // Bubble border color
      },
      opacity: {
        80: "0.8", // 80% transparency for bubbles
      },
    },
  },
  plugins: [],
};
