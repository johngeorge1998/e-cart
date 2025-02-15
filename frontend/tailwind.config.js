/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
			  // Set Montserrat as the default sans font
			  sans: ['Montserrat', 'Arial', 'sans-serif'],
			  serif: ['Georgia', 'serif'],
			},
		  },
	},
	plugins: [],
};
