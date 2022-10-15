import { Hsl } from "Lib/Colors.js"

export const Halloween = (): ThemeSpecification => ({
	ContrastBody: 50,
	ContrastPanel: 0,
	ContrastText: 900,
	CssName: "halloween-dark",
	IsLight: false,
	Label: "Halloween",
	TokensColorTheme: colors,
})

const colors: ThemeColors = {
	danger: {
		Min: Hsl(0, 56, 23.9),
		C500: Hsl(0.7, 89.6, 57.2),
		C600: Hsl(0, 98.6, 67.9),
		Max: Hsl(0, 100, 95.9),
	},
	neutral: {
		Min: Hsl(257, 40, 14),
		C500: Hsl(272, 25, 49),
		C600: Hsl(281, 25, 60),
		Max: Hsl(281, 7, 99),
	},
	primary: {
		Min: Hsl(12, 65, 22),
		C500: Hsl(24, 100, 52),
		C600: Hsl(30, 100, 60),
		Max: Hsl(36, 100, 96),
	},
	success: {
		Min: Hsl(114, 30, 16),
		C500: Hsl(96, 34, 48),
		C600: Hsl(86, 51, 58),
		Max: Hsl(80, 100, 92),
	},
	warning: {
		Min: Hsl(200, 60, 18),
		C500: Hsl(200, 70, 50),
		C600: Hsl(200, 80, 60),
		Max: Hsl(200, 100, 95),
	},
}
