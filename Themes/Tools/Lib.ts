import * as chroma from "chroma.ts"
import { css, unsafeCSS } from "lit"
import { LCH_to_sRGB } from "./ColourSpace.js"

const assert = (isValid: boolean, msg: string) => {
	if (!isValid) throw new Error(msg) }
const assertA = (a?: number) => assert(
	a === undefined || (0.0 <= a && a <= 100.0),
	`Invalid Alpha ${a}`)
const assertC = (c: number) => assert(
	Number.isFinite(c) && c >= 0,
	`Invalid Chroma ${c}`)
const assertH = (h: number) => assert(
	0 <= h && h <= 360,
	`Invalid Hue ${h}`)
const assertL = (l: number) => assert(
	0 <= l && l <= 100,
	`Invalid Lightness ${l}`)
const assertS = (s: number) => assert(
	0 <= s && s <= 100,
	`Invalid Saturation ${s}`)

export const Lch = (l: number, c: number, h: number, a?: number): chroma.Color => {
	assertL(l); assertC(c); assertH(h); assertA(a)
	return chroma.lch(l,c,h,a)
}
export const Hsl = (h: number, s: number, l: number, a?: number): chroma.Color => {
	assertH(h); assertS(s); assertL(l); assertA(a)
	const aScaled = a === undefined ? undefined : a / 100.0
	return chroma.hsl(h, s / 100.0, l / 100.0, aScaled)
}

const replaceChroma = (lch: TupleTriple, c: number): TupleTriple =>
	[lch[0], c, lch[2]]
const lchToSrgbSpace = (lch: TupleTriple): TupleTriple => {
	if (getIsSrgb(lch)) return lch

	let cHi = lch[1]
	let cLo = 0
	const ε = .0001
	let newLch = lch
	while (cHi - cLo > ε) {
		const avg = (cHi + cLo) / 2
		newLch = replaceChroma(lch, avg)
		if (getIsSrgb(newLch)) {
			cLo = avg }
		else {
			cHi = avg
		}
	}
	return newLch
}

const toSrgbColourSpace = (colour: chroma.Color) => {
	const alpha = colour.alpha()
	const lch = colour.lch()
	const lchSrgb = lchToSrgbSpace(lch)
	return chroma
		.lch(lchSrgb)
		.alpha(alpha)
}

const getIsSrgb = (lch: TupleTriple) => {
	const ε = .000005
	const rgb = LCH_to_sRGB(lch)
	return rgb.every(v => v + ε > 0.0)
	    && rgb.every(v => v - ε < 1.0)
}

const test = Lch(50, 132, 80)
toSrgbColourSpace(test)

export const Interpolate = (cs: chroma.Color[], count: number): chroma.Color[] => chroma
	.scale(cs)
	.mode("lch")
	.colors(count, "lch")
	.map(c => chroma.lch(c))
	.map(c => toSrgbColourSpace(c))

const getIsColour = (v: ThemeValue): v is chroma.Color =>
	(v as chroma.Color).alpha !== undefined
const colourToCss = (c: chroma.Color) => {
	const [h1,s1,l1] = c.hsl()
	const r1 = (n: number) => Math.round(n * 10) / 10
	const [h,s,l] = [r1(h1), r1(s1 * 100), r1(l1 * 100)]
	const a = r1(c.alpha() * 100)
	return a < 100
		? `hsl(${h} ${s}% ${l}% / ${a}%)`
		: `hsl(${h} ${s}% ${l}%)`
}
const vToString = (v: ThemeValue): string => {
	if (getIsColour(v)) return colourToCss(v)
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
