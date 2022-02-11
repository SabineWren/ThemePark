import { Hsl } from "Themes/Lib/Colours.js"

export const ShoelaceDark = (): ThemeSpecification => ({
	ContrastBody: 0,
	// ContrastButtonHover: 500,
	ContrastPanel: 50,
	ContrastText: 900,
	CssName: "shoelace-dark",
	IsLight: false,
	Label: "Shoelace - Dark",
	TokensColourTheme: colours,
})

const colours: ThemeColours = {
	danger: {
		Min: Hsl(0, 56, 23.9),
		C500: Hsl(0.7, 89.6, 57.2),
		C600: Hsl(0, 98.6, 67.9),
		Max: Hsl(0, 100, 95.9),
	},
	neutral: {
		Min: Hsl(240, 5.9, 11),
		C500: Hsl(240, 3.7, 44),
		C600: Hsl(240, 5.3, 58),
		Max: Hsl(0, 0, 100),
	},
	primary: {
		Min: Hsl(203, 63.8, 20.9),
		C500: Hsl(199.7, 85.9, 47.7),
		C600: Hsl(198.7, 97.9, 57.2),
		Max: Hsl(186, 100, 95.5),
	},
	success: {
		Min: Hsl(144.3, 53.6, 16),
		C500: Hsl(141.1, 64.9, 43),
		C600: Hsl(141.6, 72.4, 55.2),
		Max: Hsl(144, 100, 95.5),
	},
	warning: {
		Min: Hsl(21.9, 66.3, 21.1),
		C500: Hsl(37, 96.6, 48.3),
		C600: Hsl(43.3, 100, 53.4),
		Max: Hsl(60, 100, 94.6),
	},
}
