import * as chroma from "chroma.ts"
import { html } from "lit"
// import { ChromaHsl, Hsl } from "Themes/Tools/Lib.js"

export const TokensFromHsl = (hslInput: string, name: string) => {
	const colorScale = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
	const baseColour = chroma.color(hslInput)
	const colours = chroma.scale([
		baseColour.saturate(0.45).luminance(.95),// 50
		baseColour,
		baseColour.desaturate(0.1).luminance(.018),// 950
	])
		.mode("lch")
		.colors(11, "hsl")

	const swatches = colours
		.map(c => html`<div class="swatch" style="background: ${chroma.hsl(c)}"></div>`)
	const tokens = colours
		.map((c,i) => `--sl-color-${name}-${colorScale[i]}: ${hslToString(c)}`)
		.join("\n")
	return { Swatches: swatches, Tokens: tokens }
}

const hslToString = ([h,s,l]: [number, number, number]) =>
	`hsl(${h.toFixed(0)} ${(s*100).toFixed(1)}% ${(l*100).toFixed(1)}%)`
