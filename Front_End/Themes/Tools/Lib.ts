import * as chroma from "chroma.ts"

export const Hsl = (h: number, s: number, l: number, a?: number): Hsl =>
	({ H: h, S: s, L: l, A: a })
export const Rgb = (r: number, g: number, b: number, a?: number): Rgb =>
	({ R:r, G: g, B: b, A: a })

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
