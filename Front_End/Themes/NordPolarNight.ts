import { css, CSSResult } from "lit"
import { Nord } from "./NordPalette.js"
import { Hsl, Interpolate } from "./Tools/Lib.js"

export const NordPolarNightBody = (className: CSSResult) => css`
body.${className} {
	background: var(--sl-color-neutral-200);
	color: var(--sl-color-neutral-900);
}`

const neutral = Interpolate([
	Hsl(220, 16, 16),
	Nord[0], Nord[1], Nord[2], Nord[3],
	Nord[4], Nord[5], Nord[6],
	Hsl(220, 0, 100),
], 13)

const primary = Interpolate([
	Hsl(200, 35, 25),
	Nord[8],
	Hsl(185, 63, 96),
], 11)

export const NordPolarNight: ThemeTargetShoelace = {
	// Primary
	"--sl-color-primary-50": primary[0],
	"--sl-color-primary-100": primary[1],
	"--sl-color-primary-200": primary[2],
	"--sl-color-primary-300": primary[3],
	"--sl-color-primary-400": primary[4],
	"--sl-color-primary-500": primary[5],
	"--sl-color-primary-600": primary[6],
	"--sl-color-primary-700": primary[7],
	"--sl-color-primary-800": primary[8],
	"--sl-color-primary-900": primary[9],
	"--sl-color-primary-950": primary[10],

	// Success
	"--sl-color-success-50": Nord[14],// TODO
	"--sl-color-success-100": Nord[14],
	"--sl-color-success-200": Nord[14],
	"--sl-color-success-300": Nord[14],
	"--sl-color-success-400": Nord[14],
	"--sl-color-success-500": Nord[14],
	"--sl-color-success-600": Nord[14],
	"--sl-color-success-700": Nord[14],
	"--sl-color-success-800": Nord[14],
	"--sl-color-success-900": Nord[14],
	"--sl-color-success-950": Nord[14],

	// Warning
	"--sl-color-warning-50": Nord[13],// TODO
	"--sl-color-warning-100": Nord[13],
	"--sl-color-warning-200": Nord[13],
	"--sl-color-warning-300": Nord[13],
	"--sl-color-warning-400": Nord[13],
	"--sl-color-warning-500": Nord[13],
	"--sl-color-warning-600": Nord[13],
	"--sl-color-warning-700": Nord[13],
	"--sl-color-warning-800": Nord[13],
	"--sl-color-warning-900": Nord[13],
	"--sl-color-warning-950": Nord[13],

	// Danger
	"--sl-color-danger-50": Nord[11],// TODO
	"--sl-color-danger-100": Nord[11],
	"--sl-color-danger-200": Nord[11],
	"--sl-color-danger-300": Nord[11],
	"--sl-color-danger-400": Nord[11],
	"--sl-color-danger-500": Nord[11],
	"--sl-color-danger-600": Nord[11],
	"--sl-color-danger-700": Nord[11],
	"--sl-color-danger-800": Nord[11],
	"--sl-color-danger-900": Nord[11],
	"--sl-color-danger-950": Nord[11],

	// Neutral
	"--sl-color-neutral-0": neutral[0],
	"--sl-color-neutral-50": neutral[1],
	"--sl-color-neutral-100": neutral[2],
	"--sl-color-neutral-200": neutral[3],
	"--sl-color-neutral-300": neutral[4],
	"--sl-color-neutral-400": neutral[5],
	"--sl-color-neutral-500": neutral[6],
	"--sl-color-neutral-600": neutral[7],
	"--sl-color-neutral-700": neutral[8],
	"--sl-color-neutral-800": neutral[9],
	"--sl-color-neutral-900": neutral[10],
	"--sl-color-neutral-950": neutral[11],
	"--sl-color-neutral-1000": neutral[12],

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
		XYBlurSpread: "0 0 0 3px", Colour: Hsl(198.6, 88.7, 44.8, 45)},

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
