import { css, unsafeCSS } from "lit"
import { Nord } from "Themes/Palettes/NordPalette.js"
import { Hsl } from "Themes/Tools/Lib.js"
import * as Shoelace from "Themes/Tools/Shoelace.js"

export const NordPolarNight = (className: string): ThemeSpecification => ({
	Label: "Nord Polar Night",
	CssName: className,
	HtmlBodyCss: css`
body.${unsafeCSS(className)} {
	background: var(--sl-color-neutral-200);
	color: var(--sl-color-neutral-900);
}`,
	DesignTokens: tokens,
	PlatformTokens: Shoelace.ShoelaceTokensShared,
})

const tokens: ThemeTokensShoelace = {
	// TODO Danger
	...Shoelace.StripDanger([
		Nord[11],
		Nord[11],
	]),

	// Neutral
	...Shoelace.StripNeutral([
		Nord[0], Nord[1], Nord[2], Nord[3],
		Nord[4], Nord[5], Nord[6],
	]),

	// Primary
	...Shoelace.StripPrimary([
		Hsl(200, 35, 25),
		Nord[8],
		Hsl(185, 63, 96),
	]),

	// TODO Success
	...Shoelace.StripSuccess([
		Nord[14],
		Nord[14],
	]),

	// TODO Warning
	...Shoelace.StripWarning([
		Nord[13],
		Nord[13],
	]),

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
