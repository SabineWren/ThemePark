import * as chroma from "chroma.ts"
import { Interpolate } from "Themes/Lib/Colours.js"

export const SlKeyPc = (t: SemanticColour): keyof ThemeColours => {
	switch (t) {
	case "danger": return "Danger"
	case "neutral": return "Neutral"
	case "primary": return "Primary"
	case "success": return "Success"
	case "warning": return "Warning"
	}
}
export const ColourTypes: SemanticColoursTuple =
	["primary", "success", "neutral", "warning", "danger"] as const

export const Tokenize = (cs: chroma.Color[], t: SemanticColour) =>
	t === "neutral" ? tokenize13(cs, t) : tokenize11(cs, t)
export const TokenizeAll = (cs: ThemeColours) => ColourTypes
	.map(t => Tokenize(cs[SlKeyPc(t)], t))
	.reduce((a,g) => ({ ...a, ...g }))

const tokenizeFactory = (steps: number[]) => (colours: chroma.Color[], token: string) => {
	const tokens = steps.map(s => `--sl-color-${token}-${s}`)
	const shades = Interpolate(colours, steps.length)
	const kvs = zip2(tokens, shades)
	return Object.fromEntries(kvs)
}
const tokenize11 = tokenizeFactory(
	[50,100, 200, 300, 400, 500, 600, 700, 800, 900, 950])
const tokenize13 = tokenizeFactory(
	[0, 50,100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000])

const zip2 = <X,Y>(xs: X[], ys: Y[]) =>
	xs.map((_,i): [X,Y] => [xs[i], ys[i]])
