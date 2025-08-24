/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./screens/**/*.{js,ts,jsx,tsx}",
     "./components/**/*.{js,jsx,ts,tsx}",
     "./navigation/**/*.{js,tsx,ts,jsx}"
    ],

  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}