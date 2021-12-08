import * as chroma from "chroma.ts"
import { LCH_to_RGB_Percents } from "./Rgb.js"

/* Chroma works fine with LCH -> LAB,
 * but incorect LCH -> XYZ and LCH -> RGB.
 * This clamps to the perceptually-nearest sRGB value */
export const ToSrgbColourSpace = (colour: chroma.Color) => {
	const alpha = colour.alpha()
	const lch = colour.lch()
	const lchSrgb = lchToSrgbSpace(lch)
	return chroma
		.lch(lchSrgb)
		.alpha(alpha)
}

const lchToSrgbSpace = (lch: TupleTriple): TupleTriple => {
	if (getIsSrgb(lch)) return lch
	let cHi = lch[1]
	let cLo = 0
	const ε = .0001
	let newLch = lch
	// Binary Search for max sRGB chroma
	while (cHi - cLo > ε) {
		const avg = (cHi + cLo) / 2
		newLch = [lch[0], avg, lch[2]]
		if (getIsSrgb(newLch)) {
			cLo = avg }
		else {
			cHi = avg
		}
	}
	return newLch
}

const getIsSrgb = (lch: TupleTriple) => {
	const ε = .000005
	const rgb = LCH_to_RGB_Percents(lch)
	return rgb.every(v => v + ε > 0.0)
	    && rgb.every(v => v - ε < 1.0)
}
