import { Hsl } from "Lib/Colors.js"

export const ShoelaceLight = (): ThemeSpecification => ({
	ContrastBody: 0,
	// ContrastButtonHover: 500,
	ContrastPanel: 0,
	ContrastText: 900,
	CssName: "shoelace-light",
	IsLight: true,
	Label: "Shoelace - Light",
	TokensColorTheme: colors,
})

const colors: ThemeColors = {
	danger: {
		Min: Hsl(0, 85.7, 97.3),
		C500: Hsl(0, 84.2, 60.2),
		C600: Hsl(0, 72.2, 50.6),
		Max: Hsl(0, 60, 19.6),
	},
	neutral: {
		Min: Hsl(0, 0, 100),
		C500: Hsl(240, 3.8, 46.1),
		C600: Hsl(240, 5.2, 33.9),
		Max: Hsl(0, 0, 0),
	},
	primary: {
		Min: Hsl(204, 100, 93.1),
		C500: Hsl(198.6, 88.7, 48.4),
		C600: Hsl(200.4, 98, 39.4),
		Max: Hsl(202.3, 73.8, 16.5),
	},
	success: {
		Min: Hsl(138.5, 76.5, 93),
		C500: Hsl(142.1, 70.6, 45.3),
		C600: Hsl(142.1, 76.2, 36.3),
		Max: Hsl(144.3, 60.7, 12),
	},
	warning: {
		Min: Hsl(48, 100, 96.1),
		C500: Hsl(37.7, 92.1, 50.2),
		C600: Hsl(32.1, 94.6, 43.7),
		Max: Hsl(22.9, 74.1, 16.7),
	},
}
