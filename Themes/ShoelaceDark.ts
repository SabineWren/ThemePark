import { css, unsafeCSS } from "lit"
import { Hsl } from "Themes/Lib/Colours.js"
import * as Shoelace from "Themes/Platform_Targets/Shoelace.js"

export const ShoelaceDark = (className: string): ThemeSpecification => ({
	Label: "Shoelace Dark",
	CssName: className,
	HtmlBodyCss: css`
body.${unsafeCSS(className)} {
	background: var(--sl-color-neutral-0);
	color: var(--sl-color-neutral-900);
}`,
	DesignTokens: tokens,
	PlatformTokens: Shoelace.ShoelaceTokensShared,
})

const tokens: ThemeTokensShoelace = {
	...Shoelace.StripDanger([
		Hsl(0, 56, 23.9),
		Hsl(0.6, 60, 33.9),
		Hsl(0.9, 67.2, 37.1),
		Hsl(1.1, 71.3, 43.7),
		Hsl(1, 76, 52.5),
		Hsl(0.7, 89.6, 57.2),
		Hsl(0, 98.6, 67.9),
		Hsl(0, 100, 72.3),
		Hsl(0, 100, 85.6),
		Hsl(0, 100, 90.3),
		Hsl(0, 100, 95.9),
	]),

	// Neutral
	...Shoelace.StripNeutral([
		Hsl(240, 5.9, 11),
		Hsl(240, 5.1, 15),
		Hsl(240, 5.7, 18.2),
		Hsl(240, 4.6, 22),
		Hsl(240, 5, 27.6),
		Hsl(240, 5, 35.5),
		Hsl(240, 3.7, 44),
		Hsl(240, 5.3, 58),
		Hsl(240, 5.6, 73),
		Hsl(240, 7.3, 84),
		Hsl(240, 9.1, 91.8),
		Hsl(0, 0, 95),
		Hsl(0, 0, 100),
	]),

	// Primary
	...Shoelace.StripPrimary([
		Hsl(203, 63.8, 20.9),
		Hsl(203.4, 70.4, 28),
		Hsl(202.7, 75.8, 30.8),
		Hsl(203.1, 80.4, 36.1),
		Hsl(202.1, 80.5, 44.3),
		Hsl(199.7, 85.9, 47.7),
		Hsl(198.7, 97.9, 57.2),
		Hsl(198.7, 100, 70.5),
		Hsl(198.8, 100, 82.5),
		Hsl(198.5, 100, 89.9),
		Hsl(186, 100, 95.5),
	]),

	 // Success
	...Shoelace.StripSuccess([
		Hsl(144.3, 53.6, 16),
		Hsl(143.2, 55.4, 23.5),
		Hsl(141.5, 58.2, 26.3),
		Hsl(140.8, 64.2, 31.8),
		Hsl(140.3, 68, 39.2),
		Hsl(141.1, 64.9, 43),
		Hsl(141.6, 72.4, 55.2),
		Hsl(141.7, 82.7, 70.1),
		Hsl(141, 90.9, 82.1),
		Hsl(142, 100, 89.1),
		Hsl(144, 100, 95.5),
	]),

	 // Warning
	...Shoelace.StripWarning([
		Hsl(21.9, 66.3, 21.1),
		Hsl(21.5, 73.6, 29.7),
		Hsl(22.3, 77.6, 33.3),
		Hsl(25.4, 84.2, 39.6),
		Hsl(31.4, 87.4, 46.7),
		Hsl(37, 96.6, 48.3),
		Hsl(43.3, 100, 53.4),
		Hsl(46.5, 100, 61.1),
		Hsl(49.3, 100, 73),
		Hsl(51.8, 100, 85),
		Hsl(60, 100, 94.6),
	]),

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

	"--sl-input-background-color": `var(--sl-color-neutral-0)`,
	"--sl-input-background-color-hover": `var(--sl-input-background-color)`,
	"--sl-input-background-color-focus": `var(--sl-input-background-color)`,
	"--sl-input-background-color-disabled": `var(--sl-color-neutral-100)`,
	"--sl-input-border-color": `var(--sl-color-neutral-300)`,
	"--sl-input-border-color-hover": `var(--sl-color-neutral-400)`,
	"--sl-input-border-color-focus": `var(--sl-color-primary-500)`,
	"--sl-input-border-color-disabled": `var(--sl-color-neutral-300)`,

	"--sl-input-color": `var(--sl-color-neutral-700)`,
	"--sl-input-color-hover": `var(--sl-color-neutral-700)`,
	"--sl-input-color-focus": `var(--sl-color-neutral-700)`,
	"--sl-input-color-disabled": `var(--sl-color-neutral-900)`,
	"--sl-input-icon-color": `var(--sl-color-neutral-500)`,
	"--sl-input-icon-color-hover": `var(--sl-color-neutral-600)`,
	"--sl-input-icon-color-focus": `var(--sl-color-neutral-600)`,
	"--sl-input-placeholder-color": `var(--sl-color-neutral-500)`,
	"--sl-input-placeholder-color-disabled": `var(--sl-color-neutral-600)`,

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
	"--sl-overlay-background-color": Hsl(0, 0, 0, 43),

	// Panels
	"--sl-panel-background-color": `var(--sl-color-neutral-50)`,
	"--sl-panel-border-color": `var(--sl-color-neutral-200)`,

	// Tooltips
	"--sl-tooltip-background-color": `var(--sl-color-neutral-800)`,
	"--sl-tooltip-color": `var(--sl-color-neutral-0)`,
}
