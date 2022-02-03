import { css } from "lit"
import { Hsl } from "Themes/Lib/Colours.js"

export const ShoelaceDark = (): ThemeSpecification => ({
	ComponentPartsCss: css``,
	CssName: "shoelace-dark",
	IsLight: false,
	Label: "Shoelace Dark",
	TokenColourBackground: "--sl-color-neutral-0",
	TokenColourText: "--sl-color-neutral-900",
	TokensColourTheme: colours,
	TokensShoelace: tokens,
})

const colours: ThemeColours = {
	Danger: [
		Hsl(0, 56, 23.9),
		Hsl(0.6, 60, 33.9),
		Hsl(0.9, 67.2, 37.1),
		Hsl(1.1, 71.3, 43.7),
		Hsl(1, 76, 52.5),
		Hsl(0.7, 89.6, 57.2),
		Hsl(0, 98.6, 67.9),
		Hsl(0, 100, 72.3),
		Hsl(0, 100, 85.6),
		Hsl(0, 100, 90.3),
		Hsl(0, 100, 95.9),
	],
	Neutral: [
		Hsl(240, 5.9, 11),
		Hsl(240, 5.1, 15),
		Hsl(240, 5.7, 18.2),
		Hsl(240, 4.6, 22),
		Hsl(240, 5, 27.6),
		Hsl(240, 5, 35.5),
		Hsl(240, 3.7, 44),
		Hsl(240, 5.3, 58),
		Hsl(240, 5.6, 73),
		Hsl(240, 7.3, 84),
		Hsl(240, 9.1, 91.8),
		Hsl(0, 0, 95),
		Hsl(0, 0, 100),
	],
	Primary: {
		CMin_Start_Bg: Hsl(203, 63.8, 20.9),
		C500: Hsl(199.7, 85.9, 47.7),
		C600: Hsl(198.7, 97.9, 57.2),
		CMax_End_Text: Hsl(186, 100, 95.5),
	},
	/* Primary: [
		Hsl(203, 63.8, 20.9),
		Hsl(203.4, 70.4, 28),
		Hsl(202.7, 75.8, 30.8),
		Hsl(203.1, 80.4, 36.1),
		Hsl(202.1, 80.5, 44.3),
		Hsl(199.7, 85.9, 47.7),
		Hsl(198.7, 97.9, 57.2),
		Hsl(198.7, 100, 70.5),
		Hsl(198.8, 100, 82.5),
		Hsl(198.5, 100, 89.9),
		Hsl(186, 100, 95.5),
	],*/
	Success: [
		Hsl(144.3, 53.6, 16),
		Hsl(143.2, 55.4, 23.5),
		Hsl(141.5, 58.2, 26.3),
		Hsl(140.8, 64.2, 31.8),
		Hsl(140.3, 68, 39.2),
		Hsl(141.1, 64.9, 43),
		Hsl(141.6, 72.4, 55.2),
		Hsl(141.7, 82.7, 70.1),
		Hsl(141, 90.9, 82.1),
		Hsl(142, 100, 89.1),
		Hsl(144, 100, 95.5),
	],
	Warning: [
		Hsl(21.9, 66.3, 21.1),
		Hsl(21.5, 73.6, 29.7),
		Hsl(22.3, 77.6, 33.3),
		Hsl(25.4, 84.2, 39.6),
		Hsl(31.4, 87.4, 46.7),
		Hsl(37, 96.6, 48.3),
		Hsl(43.3, 100, 53.4),
		Hsl(46.5, 100, 61.1),
		Hsl(49.3, 100, 73),
		Hsl(51.8, 100, 85),
		Hsl(60, 100, 94.6),
	],
}

const tokens: ThemeTokensShoelaceStatic = {
	// Elevations (box shadows)
	"--sl-shadow-x-small": {
		XYBlurSpread: "0 1px 2px", Colour: Hsl(0, 0, 0, 18) },
	"--sl-shadow-small": {
		XYBlurSpread: "0 1px 2px", Colour: Hsl(0, 0, 0, 24) },
	"--sl-shadow-medium": {
		XYBlurSpread: "0 2px 4px", Colour: Hsl(0, 0, 0, 24)},
	"--sl-shadow-large": {
		XYBlurSpread: "0 2px 8px", Colour: Hsl(0, 0, 0, 24)},
	"--sl-shadow-x-large": {
		XYBlurSpread: "0 4px 16px", Colour: Hsl(0, 0, 0, 24)},

	// *** Forms ***
	"--sl-focus-ring": {
		XYBlurSpread: "0 0 0 3px", Colour: Hsl(198.6, 88.7, 48.4, 45)},

	// Overlays
	"--sl-overlay-background-color": Hsl(0, 0, 0, 43),

	// Panels
	"--sl-panel-background-color": `var(--sl-color-neutral-50)`,
	"--sl-panel-border-color": `var(--sl-color-neutral-200)`,
}
