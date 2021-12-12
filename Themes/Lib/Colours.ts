import * as chroma from "chroma.ts"
import { ToSrgbColourSpace } from "./Clamp_sRGB.js"

// ***** Colour Math *****
const grey = chroma.hsl(0,0,0.5)
const withMinTwoColours = (cs: chroma.Color[]) =>
	cs.length >= 2 ? cs : [cs[0] ?? grey, cs[0] ?? grey]
export const Interpolate = (cs: chroma.Color[], count: number): chroma.Color[] => chroma
	.scale(withMinTwoColours(cs))
	.mode("lch")
	.colors(count, "lch")
	.map(c => chroma.lch(c))
	.map(c => ToSrgbColourSpace(c))

// ***** Colour Parsers *****
const assert = (msg: string, isValid: boolean) => {
	if (!isValid) throw new Error(msg) }
const assertA = (a?: number) => assert(
	`Invalid Alpha ${a}`, a === undefined || (0.0 <= a && a <= 100.0))
const assertC = (c: number) => assert(
	`Invalid Chroma ${c}`, Number.isFinite(c) && c >= 0)
const assertH = (h: number) => assert(
	`Invalid Hue ${h}`, 0 <= h && h <= 360)
const assertL = (l: number) => assert(
	`Invalid Lightness ${l}`, 0 <= l && l <= 100)
const assertS = (s: number) => assert(
	`Invalid Saturation ${s}`, 0 <= s && s <= 100)

export const Lch = (l: number, c: number, h: number, a?: number): chroma.Color => {
	assertL(l); assertC(c); assertH(h); assertA(a)
	return chroma.lch(l,c,h,a)
}
export const Hsl = (h: number, s: number, l: number, a?: number): chroma.Color => {
	assertH(h); assertS(s); assertL(l); assertA(a)
	const aScaled = a === undefined ? undefined : a / 100.0
	return chroma.hsl(h, s / 100.0, l / 100.0, aScaled)
}

// ***** Colour Formatters *****
const toHsla = (c: chroma.Color): [number,number,number,number] => {
	const [h1,s1,l1] = c.hsl()
	const r1 = (n: number) => Math.round(n * 10) / 10
	return [r1(h1), r1(s1 * 100), r1(l1 * 100), r1(c.alpha() * 100)]
}
export const ToStringHsl = (c: chroma.Color) => {
	const [h,s,l,a] = toHsla(c)
	return a < 100
		? `hsl(${h} ${s}% ${l}% / ${a}%)`
		: `hsl(${h} ${s}% ${l}%)`
}
export const ToStringHslCommas = (c: chroma.Color) => {
	const [h,s,l,a] = toHsla(c)
	return a < 100
		? `hsla(${h}, ${s}%, ${l}%, ${a}%)`
		: `hsl(${h}, ${s}%, ${l}%)`
}
