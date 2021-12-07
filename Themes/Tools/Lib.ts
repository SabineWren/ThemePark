import * as chroma from "chroma.ts"
import { css, unsafeCSS } from "lit"

export const Hsl = (h: number, s: number, l: number, a?: number): Hsl =>
	({ H: h, S: s, L: l, A: a })

const wrap = (c: Hsl) => {
	if (c.H < 0 || c.H > 360) throw new Error(`Invalid Hue ${c.H}`)
	if (c.S < 0 || c.S > 100) throw new Error(`Invalid Saturation ${c.S}`)
	if (c.L < 0 || c.L > 100) throw new Error(`Invalid Lightness ${c.L}`)
	const alpha = c.A === undefined ? undefined : c.A / 100.0
	return chroma.hsl(c.H, c.S / 100.0, c.L / 100.0, alpha)
}
const unwrap = ([h,s,l]: [number, number, number]): Hsl =>
	({ H: h, S: s * 100, L: l * 100 })

export const Interpolate = (cs: Hsl[], count: number): Hsl[] => chroma
	.scale(cs.map(wrap))
	.mode("hsl")
	.colors(count, "hsl")
	.map(unwrap)

const getIsHsl = (v: ThemeValue): v is Hsl =>
	(v as Hsl).H !== undefined
const vToString = (v: ThemeValue): string => {
	if (getIsHsl(v)) return v.A === undefined
		? `hsl(${v.H} ${v.S}% ${v.L}%)`
		: `hsl(${v.H} ${v.S}% ${v.L}% / ${v.A}%)`
	if (typeof v === "string") return v
	return `${v.XYBlurSpread} ${vToString(v.Colour)}`
}

/* Stylesheet has 3 parts:
1. Body css, which should just set text colour and background
2. Theme css, which affects body, root, and hosts
3. Platform-specific shared css (ex. Shoelace tokens) */
export const ThemeToCss = (spec: ThemeSpecification) => {
	const themeTokenText = Object.entries(spec.DesignTokens)
		.map(([k,v]) => `${k}: ${vToString(v)};`)
		.join("\n")
	return css`
${spec.HtmlBodyCss}
:root,
:host,
.${unsafeCSS(spec.CssName)} {
	${unsafeCSS(themeTokenText)}
}
${spec.PlatformTokens}`
}
