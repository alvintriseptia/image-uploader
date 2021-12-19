module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {
			keyframes: {
				loading: {
					"0%": { transform: "translateX(-50px)" },
					"100%": { transform: "translateX(350px)" },
				},
			},
			backgroundImage: {
				"image-icon": "url('./image.svg')",
			},
		},
	},
	plugins: [],
};
