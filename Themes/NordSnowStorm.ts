import { css } from "lit"
import { Nord } from "Themes/Palettes/NordPalette.js"
import { Hsl } from "Themes/Lib/Colours.js"

export const NordSnowStorm = (): ThemeSpecification => ({
	ComponentPartsCss: css``,
	CssName: "sl-nord-snow-storm",
	IsLight: true,
	Label: "Nord Snow Storm",
	TokenColourBackground: "--sl-color-neutral-0",
	TokenColourText: "--sl-color-neutral-900",
	TokensColourTheme: colours,
	TokensShoelace: tokens,
})

const colours: ThemeColours = {
	danger: {
		CMin: Hsl(354, 100, 80),
		C500: Nord.C11_Red,
		C600: Nord.C11_RedDark,
		CMax: Hsl(354, 38, 10),
	},
	// TODO create some greys for Nord
	neutral: {
		CMin: Nord[6],
		C500: Nord[5],
		C600: Nord[4],
		CMax: Nord[0],
	},
	primary: {
		CMin: Hsl(185, 63, 96),
		C500: Nord.Blue8,
		C600: Nord.Blue8Dark,
		CMax: Hsl(200, 35, 25),
	},
	success: {
		CMin: Hsl(80, 80, 86),
		C500: Nord.Green14,
		C600: Nord.Green14Dark,
		CMax: Hsl(98, 25, 25),
	},
	warning: {
		CMin: Hsl(60, 100, 95),
		C500: Nord.Yellow13,
		C600: Nord.Yellow13Dark,
		CMax: Hsl(20, 50, 20),
	},
}

const tokens: ThemeTokensShoelaceStatic = {
	// TODO
	// Elevations (box shadows)
	"--sl-shadow-x-small": {
		XYBlurSpread: "0 1px 2px", Colour: Hsl(240, 3.8, 46.1, 6) },
	"--sl-shadow-small": {
		XYBlurSpread: "0 1px 2px", Colour: Hsl(240, 3.8, 46.1, 12) },
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
