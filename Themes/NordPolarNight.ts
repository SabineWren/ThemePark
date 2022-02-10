import { css } from "lit"
import { Nord } from "Themes/Palettes/NordPalette.js"
import { Hsl } from "Themes/Lib/Colours.js"

export const NordPolarNight = (): ThemeSpecification => ({
	ComponentPartsCss: css``,
	ContrastBody: 200,
	// ContrastButtonHover: 500,
	ContrastPanel: 50,
	ContrastText: 900,
	CssName: "sl-nord-polar-night",
	IsLight: false,
	Label: "Nord - Polar Night",
	TokensColourTheme: colours,
	TokensShoelace: tokens,
})

const colours: ThemeColours = {
	danger: {
		Min: Nord.C11_RedCustom1,
		C500: Nord.C11_RedCustom2,
		C600: Nord.C11_Red,
		Max: Nord.C11_RedCustom4,
	},
	neutral: {
		Min: Nord.Black,
		C500: Nord.GreyDark1,
		C600: Nord.GreyDark2,
		Max: Nord.White,
	},
	primary: {
		Min: Nord.Blue8Custom1,
		C500: Nord.Blue8Custom2,
		C600: Nord.Blue8,
		Max: Nord.Blue8Custom4,
	},
	success: {
		Min: Nord.Green14Custom1,
		C500: Nord.Green14Custom2,
		C600: Nord.Green14,
		Max: Nord.Green14Custom4,
	},
	warning: {
		Min: Nord.Yellow13Custom1,
		C500: Nord.Yellow13Custom2,
		C600: Nord.Yellow13,
		Max: Nord.Yellow13Custom4,
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
}
