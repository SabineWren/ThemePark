export const Hsl = (h: number, s: number, l: number, a?: number): Hsl =>
	({ Hue: h, Sat: s, Lightness: l, Alpha: a })
export const Rgb = (r: number, g: number, b: number, a?: number): Rgb =>
	({ Red:r, Green: g, Blue: b, Alpha: a })
