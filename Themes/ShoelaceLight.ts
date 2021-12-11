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
	Danger: [
		Hsl(0, 85.7, 97.3),
		Hsl(0, 93.3, 94.1),
		Hsl(0, 96.3, 89.4),
		Hsl(0, 93.5, 81.8),
		Hsl(0, 90.6, 70.8),
		Hsl(0, 84.2, 60.2),
		Hsl(0, 72.2, 50.6),
		Hsl(0, 73.7, 41.8),
		Hsl(0, 70, 35.3),
		Hsl(0, 62.8, 30.6),
		Hsl(0, 60, 19.6),
	],
	Neutral: [
		Hsl(0, 0, 100),
		Hsl(0, 0, 97.5),
		Hsl(240, 4.8, 95.9),
		Hsl(240, 5.9, 90),
		Hsl(240, 4.9, 83.9),
		Hsl(240, 5, 64.9),
		Hsl(240, 3.8, 46.1),
		Hsl(240, 5.2, 33.9),
		Hsl(240, 5.3, 26.1),
		Hsl(240, 3.7, 15.9),
		Hsl(240, 5.9, 10),
		Hsl(240, 7.3, 8),
		Hsl(0, 0, 0),
	],
	Primary: [
		Hsl(204, 100, 97.1),
		Hsl(204, 93.8, 93.7),
		Hsl(200.6, 94.4, 86.1),
		Hsl(199.4, 95.5, 73.9),
		Hsl(198.4, 93.2, 59.6),
		Hsl(198.6, 88.7, 48.4),
		Hsl(200.4, 98, 39.4),
		Hsl(201.3, 96.3, 32.2),
		Hsl(201, 90, 27.5),
		Hsl(202, 80.3, 23.9),
		Hsl(202.3, 73.8, 16.5),
	],
	Success: [
		Hsl(138.5, 76.5, 96.7),
		Hsl(140.6, 84.2, 92.5),
		Hsl(141, 78.9, 85.1),
		Hsl(141.7, 76.6, 73.1),
		Hsl(141.9, 69.2, 58),
		Hsl(142.1, 70.6, 45.3),
		Hsl(142.1, 76.2, 36.3),
		Hsl(142.4, 71.8, 29.2),
		Hsl(142.8, 64.2, 24.1),
		Hsl(143.8, 61.2, 20.2),
		Hsl(144.3, 60.7, 12),
	],
	Warning: [
		Hsl(48, 100, 96.1),
		Hsl(48, 96.5, 88.8),
		Hsl(48, 96.6, 76.7),
		Hsl(45.9, 96.7, 64.5),
		Hsl(43.3, 96.4, 56.3),
		Hsl(37.7, 92.1, 50.2),
		Hsl(32.1, 94.6, 43.7),
		Hsl(26, 90.5, 37.1),
		Hsl(22.7, 82.5, 31.4),
		Hsl(21.7, 77.8, 26.5),
		Hsl(22.9, 74.1, 16.7),
	],
}

const tokens: ThemeTokensShoelaceStatic = {
	// TODO
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
	// TODO
	"--sl-focus-ring": {
		XYBlurSpread: "0 0 0 3px", Colour: Hsl(198.6, 88.7, 48.4, 45)},

	// TODO
	"--sl-input-background-color": `var(--sl-color-neutral-0)`,
	"--sl-input-background-color-hover": `var(--sl-input-background-color)`,
	"--sl-input-background-color-focus": `var(--sl-input-background-color)`,
	"--sl-input-background-color-disabled": `var(--sl-color-neutral-100)`,
	"--sl-input-border-color": `var(--sl-color-neutral-300)`,
	"--sl-input-border-color-hover": `var(--sl-color-neutral-400)`,
	"--sl-input-border-color-focus": `var(--sl-color-primary-500)`,
	"--sl-input-border-color-disabled": `var(--sl-color-neutral-300)`,

	// TODO
	"--sl-input-color": `var(--sl-color-neutral-700)`,
	"--sl-input-color-hover": `var(--sl-color-neutral-700)`,
	"--sl-input-color-focus": `var(--sl-color-neutral-700)`,
	"--sl-input-color-disabled": `var(--sl-color-neutral-900)`,
	"--sl-input-icon-color": `var(--sl-color-neutral-500)`,
	"--sl-input-icon-color-hover": `var(--sl-color-neutral-600)`,
	"--sl-input-icon-color-focus": `var(--sl-color-neutral-600)`,
	"--sl-input-placeholder-color": `var(--sl-color-neutral-500)`,
	"--sl-input-placeholder-color-disabled": `var(--sl-color-neutral-600)`,

	// TODO
	"--sl-input-filled-background-color": `var(--sl-color-neutral-100)`,
	"--sl-input-filled-background-color-hover": `var(--sl-color-neutral-100)`,
	"--sl-input-filled-background-color-focus": `var(--sl-color-neutral-100)`,
	"--sl-input-filled-background-color-disabled": `var(--sl-color-neutral-100)`,
	"--sl-input-filled-color": `var(--sl-color-neutral-800)`,
	"--sl-input-filled-color-hover": `var(--sl-color-neutral-800)`,
	"--sl-input-filled-color-focus": `var(--sl-color-neutral-700)`,
	"--sl-input-filled-color-disabled": `var(--sl-color-neutral-800)`,

	// can default to var(--sl-color-neutral-500)
	"--sl-input-help-text-color": `var(--sl-color-neutral-500)`,

	// Overlays
	"--sl-overlay-background-color": Hsl(0, 0, 0, 43),// TODO

	// Panels
	"--sl-panel-background-color": `var(--sl-color-neutral-50)`,// TODO
	"--sl-panel-border-color": `var(--sl-color-neutral-200)`,// TODO

	// Tooltips
	"--sl-tooltip-background-color": `var(--sl-color-neutral-800)`,// TODO
	"--sl-tooltip-color": `var(--sl-color-neutral-0)`,// TODO
}
