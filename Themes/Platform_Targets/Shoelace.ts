import * as chroma from "chroma.ts"
import { css, unsafeCSS } from "lit"
import { Hsl, Interpolate, ToStringHsl } from "Themes/Lib/Colours.js"

export const ThemeToCss = (spec: ThemeSpecification) => css`
.${unsafeCSS(spec.CssName)}  {
	/* Colours */
	${unsafeCSS(coloursToCss(slTokenizeAll(spec.TokensColourTheme)))}

	/* Box Shadows, Forms, Overlays, etc. */
	${unsafeCSS(tokensToCss(spec.IsLight ? shoelaceLight : shoelaceDark))}

	/* Panels/Cards */
	--sl-panel-border-color: var(--sl-color-neutral-200);
	--sl-panel-background-color: var(--sl-color-neutral-${spec.ContrastPanel});
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

const rangeStart = [50,100, 200, 300, 400, 500]
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
