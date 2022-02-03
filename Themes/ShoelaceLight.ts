import { css } from "lit"
import { Hsl } from "Themes/Lib/Colours.js"

export const ShoelaceLight = (): ThemeSpecification => ({
	ComponentPartsCss: css``,
	CssName: "shoelace-light",
	IsLight: true,
	Label: "Shoelace Light",
	TokenColourBackground: "--sl-color-neutral-0",
	TokenColourText: "--sl-color-neutral-900",
	TokensColourTheme: colours,
	TokensShoelace: tokens,
})

const colours: ThemeColours = {
	danger: {
		CMin: Hsl(0, 85.7, 97.3),
		C500: Hsl(0, 84.2, 60.2),
		C600: Hsl(0, 72.2, 50.6),
		CMax: Hsl(0, 60, 19.6),
	},
	neutral: {
		CMin: Hsl(0, 0, 100),
		C500: Hsl(240, 3.8, 46.1),
		C600: Hsl(240, 5.2, 33.9),
		CMax: Hsl(0, 0, 0),
	},
	primary: {
		CMin: Hsl(204, 100, 97.1),
		C500: Hsl(198.6, 88.7, 48.4),
		C600: Hsl(200.4, 98, 39.4),
		CMax: Hsl(202.3, 73.8, 16.5),
	},
	success: {
		CMin: Hsl(138.5, 76.5, 96.7),
		C500: Hsl(142.1, 70.6, 45.3),
		C600: Hsl(142.1, 76.2, 36.3),
		CMax: Hsl(144.3, 60.7, 12),
	},
	warning: {
		CMin: Hsl(48, 100, 96.1),
		C500: Hsl(37.7, 92.1, 50.2),
		C600: Hsl(32.1, 94.6, 43.7),
		CMax: Hsl(22.9, 74.1, 16.7),
	},
}

const tokens: ThemeTokensShoelaceStatic = {
	// Elevations (box shadows)
	"--sl-shadow-x-small": {
		XYBlurSpread: "0 1px 2px", Colour: Hsl(240, 3.8, 46.1, 6)},
	"--sl-shadow-small": {
		XYBlurSpread: "0 1px 2px", Colour: Hsl(240, 3.8, 46.1, 12)},
	"--sl-shadow-medium": {
		XYBlurSpread: "0 2px 4px", Colour: Hsl(240, 3.8, 46.1, 12)},
	"--sl-shadow-large": {
		XYBlurSpread: "0 2px 8px", Colour: Hsl(240, 3.8, 46.1, 12)},
	"--sl-shadow-x-large": {
		XYBlurSpread: "0 4px 16px", Colour: Hsl(240, 3.8, 46.1, 12)},

	// *** Forms ***
	"--sl-focus-ring": {
		XYBlurSpread: "0 0 0 3px", Colour: Hsl(198.6, 88.7, 48.4, 40)},

	// Overlays
	"--sl-overlay-background-color": Hsl(240, 3.8, 46.1, 33),

	// Panels
	"--sl-panel-background-color": `var(--sl-color-neutral-0)`,
	"--sl-panel-border-color": `var(--sl-color-neutral-200)`,
}
