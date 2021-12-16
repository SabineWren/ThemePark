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
	Danger: [
		Hsl(354, 38, 10), Nord[11],
		Hsl(354, 100, 80),
	],
	Neutral: [
		Nord[0], Nord[1], Nord[2], Nord[3],
		Nord[4], Nord[5], Nord[6],
	],
	Primary: [
		Hsl(200, 35, 25),
		Nord[8],
		Hsl(185, 63, 96),
	],
	Success: [
		Hsl(98, 25, 25),
		Nord[14],
		Hsl(80, 80, 86),
	],
	Warning: [
		Hsl(20, 50, 20),
		Hsl(20, 53, 35),
		Hsl(28, 58, 45),
		Hsl(33, 62, 55),
		Hsl(35, 64, 58),
		Hsl(37, 66, 60),// button hovered
		Hsl(40, 71, 73),// Nord[13] button
		Hsl(44, 100, 83),
		Hsl(50, 100, 90),
		Hsl(52, 100, 88),
		Hsl(60, 100, 95),
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
