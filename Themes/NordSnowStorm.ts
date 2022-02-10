import { css } from "lit"
import { Nord } from "Themes/Palettes/NordPalette.js"
import { Hsl } from "Themes/Lib/Colours.js"

export const NordSnowStorm = (): ThemeSpecification => ({
	ComponentPartsCss: css``,
	ContrastBody: 50,
	ContrastButton: 500,
	ContrastPanel: 0,
	ContrastText: 900,
	CssName: "sl-nord-snow-storm",
	IsLight: true,
	Label: "Nord - Snow Storm",
	TokensColourTheme: colours,
	TokensShoelace: tokens,
})

const colours: ThemeColours = {
	danger: {
		Min: Nord.C11_RedCustom4,
		C500: Nord.C11_Red,
		C600: Nord.C11_RedCustom2,
		Max: Nord.C11_RedCustom1,
	},
	neutral: {
		Min: Nord.White,
		C500: Nord.GreyDark2,
		C600: Nord.GreyDark1,
		Max: Nord.Black,
	},
	primary: {
		Min: Nord.Blue8Custom4,
		C500: Nord.Blue8,
		C600: Nord.Blue8Custom2,
		Max: Nord.Blue8Custom1,
	},
	success: {
		Min: Nord.Green14Custom4,
		C500: Nord.Green14,
		C600: Nord.Green14Custom2,
		Max: Nord.Green14Custom1,
	},
	warning: {
		Min: Nord.Yellow13Custom4,
		C500: Nord.Yellow13,
		C600: Nord.Yellow13Custom2,
		Max: Nord.Yellow13Custom1,
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
}
