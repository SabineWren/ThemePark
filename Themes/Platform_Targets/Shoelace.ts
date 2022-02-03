import * as chroma from "chroma.ts"
import { Interpolate } from "Themes/Lib/Colours.js"

const rangeStart = [50,100, 200, 300, 400, 500]
const rangeEnd = [600, 700, 800, 900, 950]

export const Tokenize = (token: keyof ThemeColours, colours: ColourRange) => {
	const r1 = token === "neutral" ? [0, ...rangeStart] : rangeStart
	const r2 = token === "neutral" ? [...rangeEnd, 1000] : rangeEnd
	return {
		...tokenizeRange(token, r1, [colours.CMin, colours.C500]),
		...tokenizeRange(token, r2, [colours.C600, colours.CMax]),
	}
}
export const TokenizeAll = (cs: ThemeColours) => Object.entries(cs)
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
