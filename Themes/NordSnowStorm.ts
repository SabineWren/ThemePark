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
	Danger: [
		Nord[11],
	],
	Neutral: [
		Nord["light-card-bg"],
		Nord["light-gutter-bg"],
		Nord[6], Nord[5], Nord[4],
		Nord[3], Nord[2], Nord[1], Nord[0],
	],
	Primary: [
		Hsl(185, 63, 96),
		Nord[8],
		Hsl(200, 35, 25),
	],
	Success: [
		Nord[14],
	],
	Warning: [
		Nord[13],
	],
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
