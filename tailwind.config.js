/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '1250': '1250px', // Add custom breakpoint
      },
    },
  },
  plugins: [],
}

