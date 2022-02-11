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
const toHsla = (colour: chroma.Color): [number,number,number,number] => {
	const [h1,s1,l1] = colour.hsl()
	// These value are already clamped to the perceptually closest sRGB colour space values,
	// but chroma.Color.hsl() can give crazy lightness values like -400% when slightly below zero
	const clampFpError = (n: number) => Math.min(Math.max(0.0, n), 1.0)
	const round = (n: number) => Math.round(n * 10) / 10
	const scale = (n: number) => round(clampFpError(n) * 100)
	return [round(h1), scale(s1), scale(l1), scale(colour.alpha())]
}

export const ToStringHsl = (colour: chroma.Color) => {
	const [h,s,l,a] = toHsla(colour)
	return a < 100
		? `hsl(${h.toFixed(0)} ${s.toFixed(1)}% ${l.toFixed(1)}% / ${a.toFixed(1)}%)`
		: `hsl(${h.toFixed(0)} ${s.toFixed(1)}% ${l.toFixed(1)}%)`
}
export const ToStringHslCommas = (colour: chroma.Color) => {
	const [h,s,l,a] = toHsla(colour)
	return a < 100
		? `hsla(${h}, ${s}%, ${l}%, ${a}%)`
		: `hsl(${h}, ${s}%, ${l}%)`
}
