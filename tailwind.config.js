module.exports = {
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			width: {
				"1/7": "14.2857143%",
				"2/7": "28.5714286%",
				"3/7": "42.8571429%",
				"4/7": "57.1428571%",
				"5/7": "71.4285714%",
				"6/7": "85.7142857%",
			},
			padding: {
				md: "72px",
			},
			spacing: {
				sm: "200px",
				md: "300px",
				lmd: "442px",
				lg: "450px",
			},
			minWidth: {
				md: "300px",
			},
			minHeight: {
				sm: "275px",
				smd: "378px",
				mds: "400px",
				md: "450px",
				lg: "600px",

				x64: "19rem",
			},
			maxHeight: {
				sm: "275px",
				smd: "378px",
				md: "305px",
				lg: "405px",
				xlg: "680px",
				xl: "780px",

				x64: "19rem",
			},
		},
		container: {
			center: true,
			padding: "2rem",
		},
		colors: {
			/*
				Light
			*/
			light: "#eeeeee",
			light2: "#eeeeeef0",
			light3: "eeeeeee0",
			light4: "#eeeeeed0",
			light5: "#eeeeeec0",
			light6: "eeeeeeb0",

			lightHue: "#eeeeeebf",
			lightHue2: "#eeeeee80",
			lightHue3: "#eeeeee40",
			
			transLight: "#eeeeee50",
			lightHover: "#8e8e8e42",
			lightHover2: "#8e8e8eaa",
			white: "#ffffff",
			/*
				Medium
			*/
			medium: "#2a3538",
			medium2: "#39484cff",
			medium3: "#46585dff",
			medium4: "#53696fff",
			medium5: "#61787fff",
			medium6: "#6d8a92ff",

			mediumHue: "#2a3538cc",
			mediumHue2: "#2a353899",
			mediumHue3: "#2a353866",
			mediumHue4: "#2a353833",

			medium50: "#2a3538",
			lightmedium: "#8e8e8e",
			/*
				Dark
			*/			
			dark: "#1E292A",
			dark2: "#2a3a3cff",
			dark3: "#374c4dff",
			dark4: "#445d5fff",
			dark5: "#516e71ff",
			dark6: "#5d8083ff",

			darkHue: "#1E292Acc",
			darkHue2: "#1E292A99",
			darkHue3: "#1E292A66",
			darkHue4: "#1E292A33",

			darkHover: "#1E292Aa0",
			/*
				Black
			*/
			black: "#0f1415ff",
			black2: "#1c2527ff",
			black3: "#283639ff",
			black4: "#35474aff",
			black5: "#42585cff",
			black6: "#4f696eff",

			blackHue: "#0f1415cc",
			blackHue2: "#0f141599",
			blackHue3: "#0f141566",
			blackHue4: "#0f141533",
			/*
				Secondary
			*/
			secondary: "#00C2EF",
			secondary2: "#0fd2ffff",
			secondary3: "#2ed8ffff",
			secondary4: "#4cddffff",
			secondary5: "#6be3ffff",
			secondary6: "#8aeaffff",

			secondaryHue: "#00C2EFcc",
			secondaryHue2: "#00C2EF99",
			secondaryHue3: "#00C2EF66",
			secondaryHue4: "#00C2EF33",
			
			lighSecondary: "#d6e2e5ff",
			mediumSecondary: "#627074ff",
			secondaryLight: "#08d2ff",
			/*
				Primary
			*/
			primary: "#FFB900",
			primary2: "#ffc01fff",
			primary3: "#ffc93dff",
			primary4: "#ffd25cff",
			primary5: "#ffda7aff",
			primary6: "#ffe297ff",

			primaryHue: "#ffb900cc",
			primaryHue1: "#ffb90099",
			primaryHue2: "#ffb90066",
			primaryHue3: "#ffb90033",
			
			primaryLight: "#ffd875ff",
			/*
				Red
			*/
			red: "#ff2827ff",
			red2: "#ff4847ff",
			red3: "#ff6766ff",
			red4: "#ff8585ff",
			red5: "#ffa4a3ff",
			red6: "#ffc2c2ff",
			
			redHue: "#FF0000cc",
			redHue2: "#FF000099",
			redHue3: "#FF000066",
			redHue4: "#FF000033",

			redHueHover: "#ff00005d",
			/*
				Green
			*/
			green: "#28a745",
			green2: "#2ec250ff",
			green3: "#3dd15fff",
			green4: "#56d774ff",
			green5: "#6fdd88ff",
			green6: "#88e29cff",

			greenHue: "#28a745cc",
			greenHue2: "#28a74599",
			greenHue3: "#28a74566",
			greenHue4: "#28a74533",

			greenHueHover: "#28a74667",
			/*
				Random
			*/
			blue: "#0000ff",
			skyblue: "#209fff",
			notify: "#AD7578",
			ocean: "#0092b3",
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
