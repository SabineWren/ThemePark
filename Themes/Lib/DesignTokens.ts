import * as chroma from "chroma.ts"
import { css, unsafeCSS } from "lit"

export const ThemeToCss = (spec: ThemeSpecification) => css`
	${cssBody(spec)}
	${cssTheme(spec)}
	${spec.PlatformTokens}`

const cssBody = (spec: ThemeSpecification) => css`
	body.${unsafeCSS(spec.CssName)} {
		background: var(${unsafeCSS(spec.TokenColourBackground)});
		color: var(${unsafeCSS(spec.TokenColourText)});
	}`

const cssTheme = (spec: ThemeSpecification) => {
	const themeTokenText = Object.entries(spec.DesignTokens)
		.map(([k,v]) => `${k}: ${vToString(v)};`)
		.join("\n")
	return css`
	:root,
	:host,
	.${unsafeCSS(spec.CssName)} {
		${unsafeCSS(themeTokenText)}
	}`
}

const colourToCss = (c: chroma.Color) => {
	const [h1,s1,l1] = c.hsl()
	const r1 = (n: number) => Math.round(n * 10) / 10
	const [h,s,l] = [r1(h1), r1(s1 * 100), r1(l1 * 100)]
	const a = r1(c.alpha() * 100)
	return a < 100
		? `hsl(${h} ${s}% ${l}% / ${a}%)`
		: `hsl(${h} ${s}% ${l}%)`
}
const getIsColour = (v: ThemeValue): v is chroma.Color =>
	(v as chroma.Color).alpha !== undefined
const vToString = (v: ThemeValue): string => {
	if (getIsColour(v)) return colourToCss(v)
	if (typeof v === "string") return v
	return `${v.XYBlurSpread} ${vToString(v.Colour)}`
}
