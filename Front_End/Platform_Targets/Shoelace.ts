import * as chroma from "chroma.ts"
import { css, unsafeCSS } from "lit"
import { Hsl, Interpolate, ToStringHsl } from "Lib/Colours.js"

export const ThemeToCss = (spec: ThemeSpecification, grad: string) => css`
.${unsafeCSS(spec.CssName)}  {
	/* Colours */
	${unsafeCSS(coloursToCss(slTokenizeAll(spec.TokensColourTheme)))}

	/* Box Shadows, Forms, Overlays, etc. */
	${unsafeCSS(tokensToCss(spec.IsLight ? shoelaceLight : shoelaceDark))}

	/* Panels/Cards */
	--card-decorative-bg: ${unsafeCSS(grad)};
	--sl-panel-border-color: var(--sl-color-neutral-200);
	--sl-panel-background-color: var(--sl-color-neutral-${spec.ContrastPanel});

	/* Component Colours -- common to all themes,
	* but must apply after theme since they consume theme tokens */
	--sl-input-background-color: var(--sl-color-neutral-0);
	--sl-input-background-color-hover: var(--sl-input-background-color);
	--sl-input-background-color-focus: var(--sl-input-background-color);
	--sl-input-background-color-disabled: var(--sl-color-neutral-100);
	--sl-input-border-color: var(--sl-color-neutral-300);
	--sl-input-border-color-hover: var(--sl-color-neutral-400);
	--sl-input-border-color-focus: var(--sl-color-primary-500);
	--sl-input-border-color-disabled: var(--sl-color-neutral-300);

	--sl-input-color: var(--sl-color-neutral-700);
	--sl-input-color-hover: var(--sl-color-neutral-700);
	--sl-input-color-focus: var(--sl-color-neutral-700);
	--sl-input-color-disabled: var(--sl-color-neutral-900);
	--sl-input-icon-color: var(--sl-color-neutral-500);
	--sl-input-icon-color-hover: var(--sl-color-neutral-600);
	--sl-input-icon-color-focus: var(--sl-color-neutral-600);
	--sl-input-placeholder-color: var(--sl-color-neutral-500);
	--sl-input-placeholder-color-disabled: var(--sl-color-neutral-600);

	--sl-input-filled-background-color: var(--sl-color-neutral-100);
	--sl-input-filled-background-color-hover: var(--sl-color-neutral-100);
	--sl-input-filled-background-color-focus: var(--sl-color-neutral-100);
	--sl-input-filled-background-color-disabled: var(--sl-color-neutral-100);
	--sl-input-filled-color: var(--sl-color-neutral-800);
	--sl-input-filled-color-hover: var(--sl-color-neutral-800);
	--sl-input-filled-color-focus: var(--sl-color-neutral-700);
	--sl-input-filled-color-disabled: var(--sl-color-neutral-800);

	--sl-input-help-text-color: var(--sl-color-neutral-500);

	--sl-tooltip-background-color: var(--sl-color-neutral-800);
	--sl-tooltip-color: var(--sl-color-neutral-0);
}

body.${unsafeCSS(spec.CssName)} {
	background: var(--sl-color-neutral-${spec.ContrastBody});
	color: var(--sl-color-neutral-${spec.ContrastText});
}`

const tokenToCssFactory = <T>(toString: (v: T) => string) =>
	(tokens: { [k: string]: T }) => Object.entries(tokens)
		.map(([k,v]) => `${k}: ${toString(v)};`)
		.join("\n")

const shadowToString = (s: BoxShadow): string =>
	`${s.XYBlurSpread} ${ToStringHsl(s.Colour)}`
const getIsColour = (v: Colour | BoxShadow): v is Colour =>
	(v as chroma.Color).alpha !== undefined
const tokenToString = (v: Colour | BoxShadow) => getIsColour(v)
	? ToStringHsl(v)
	: shadowToString(v)

const coloursToCss = tokenToCssFactory(ToStringHsl)
const tokensToCss = tokenToCssFactory(tokenToString)

const shoelaceDark = {
	// Elevations (box shadows)
	"--sl-shadow-x-small": {
		XYBlurSpread: "0 1px 2px", Colour: Hsl(0, 0, 0, 18)},
	"--sl-shadow-small": {
		XYBlurSpread: "0 1px 2px", Colour: Hsl(0, 0, 0, 24)},
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
} as const
const shoelaceLight = {
	// Elevations (box shadows)
	"--sl-shadow-x-small": {
		XYBlurSpread: "0 1px 2px", Colour: Hsl(240, 3.8, 46.1, 6)},
	"--sl-shadow-small": {
		XYBlurSpread: "0 1px 2px", Colour: Hsl(240, 3.8, 46.1, 12)},
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
} as const

const rangeStart = [50, 100, 200, 300, 400, 500]
const rangeEnd = [600, 700, 800, 900, 950]

export const Tokenize = (token: keyof ThemeColours, colours: ColourRange) => {
	const r1 = token === "neutral" ? [0, ...rangeStart] : rangeStart
	const r2 = token === "neutral" ? [...rangeEnd, 1000] : rangeEnd
	return {
		...tokenizeRange(token, r1, [colours.Min, colours.C500]),
		...tokenizeRange(token, r2, [colours.C600, colours.Max]),
	}
}
const slTokenizeAll = (cs: ThemeColours) => Object.entries(cs)
	.map(([key,value]) => Tokenize(key as keyof ThemeColours, value))
	.reduce((a,g) => ({ ...a, ...g }))

const tokenizeRange = (token: string, steps: number[], colours: chroma.Color[]) => {
	const tokens = steps.map(s => `--sl-color-${token}-${s}`)
	const shades = Interpolate(colours, steps.length)
	const kvs = zip2(tokens, shades)
	return Object.fromEntries(kvs)
}
const zip2 = <X,Y>(xs: X[], ys: Y[]) =>
	xs.map((_,i): [X,Y] => [xs[i], ys[i]])
