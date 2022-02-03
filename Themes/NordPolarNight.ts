import { css } from "lit"
import { Nord } from "Themes/Palettes/NordPalette.js"
import { Hsl } from "Themes/Lib/Colours.js"

export const NordPolarNight = (): ThemeSpecification => ({
	ComponentPartsCss: css``,
	CssName: "sl-nord-polar-night",
	IsLight: false,
	Label: "Nord Polar Night",
	TokenColourBackground: "--sl-color-neutral-200",
	TokenColourText: "--sl-color-neutral-900",
	TokensColourTheme: colours,
	TokensShoelace: tokens,
})

const colours: ThemeColours = {
	danger: {
		CMin: Hsl(354, 38, 10),
		C500: Nord.C11_RedDark,
		C600: Nord.C11_Red,
		CMax: Hsl(354, 100, 80),
	},
	// TODO create some greys for Nord
	neutral: {
		CMin: Nord[0],
		C500: Nord[2],
		C600: Nord[3],
		CMax: Nord[6],
	},
	primary: {
		CMin: Hsl(200, 35, 25),
		C500: Nord.Blue8Dark,
		C600: Nord.Blue8,
		CMax: Hsl(185, 63, 96),
	},
	success: {
		CMin: Hsl(98, 25, 25),
		C500: Nord.Green14Dark,
		C600: Nord.Green14,
		CMax: Hsl(80, 80, 86),
	},
	warning: {
		CMin: Hsl(20, 50, 20),
		C500: Nord.Yellow13Dark,
		C600: Nord.Yellow13,
		CMax: Hsl(60, 100, 95),
	},
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
