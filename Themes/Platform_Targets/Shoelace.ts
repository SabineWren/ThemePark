import * as chroma from "chroma.ts"
import { Interpolate } from "Themes/Lib/Colours.js"

export const TokenizeDanger = (cs: chroma.Color[]) =>
	tokenize(cs, "danger") as TokensShoelaceDanger

export const TokenizeNeutral = (cs: chroma.Color[]) =>
	tokenizeNeutral(cs, "neutral") as TokensShoelaceNeutral

export const TokenizePrimary = (cs: chroma.Color[]) =>
	tokenize(cs, "primary") as TokensShoelacePrimary

export const TokenizeSuccess = (cs: chroma.Color[]) =>
	tokenize(cs, "success") as TokensShoelaceSuccess

export const TokenizeWarning = (cs: chroma.Color[]) =>
	tokenize(cs, "warning") as TokensShoelaceWarning

const zip2 = <X,Y>(xs: X[], ys: Y[]) =>
	xs.map((_,i): [X,Y] => [xs[i], ys[i]])

const tokenizeFactory = (steps: number[]) => (colours: chroma.Color[], token: string) => {
	const tokens = steps.map(s => `--sl-color-${token}-${s}`)
	const shades = Interpolate(colours, steps.length)
	const kvs = zip2(tokens, shades)
	return Object.fromEntries(kvs)
}
const tokenize = tokenizeFactory(
	[50,100, 200, 300, 400, 500, 600, 700, 800, 900, 950])
const tokenizeNeutral = tokenizeFactory(
	[0, 50,100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000])
