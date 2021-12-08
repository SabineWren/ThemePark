/*
 * @author Lea Verou 2020 MIT License
 * Copied to Theme Park from CSS Land.
 * Tested with a 3rd party colour converter.
 */
export const LCH_to_RGB_Percents = (LCH: TupleTriple): TupleTriple => {
	// convert an array of CIE LCH values
	// to CIE Lab, and then to XYZ,
	// adapt from D50 to D65,
	// then convert XYZ to linear-light sRGB
	// and finally to gamma corrected sRGB
	// for in-gamut colors, components are in the 0.0 to 1.0 range
	// out of gamut colors may have negative components
	// or components greater than 1.0
	// so check for that :)
	const lab = LCH_to_Lab(LCH)
	const xyz = Lab_to_XYZ(lab)
	const x = D50_to_D65(xyz)
	const y = XYZ_to_lin_sRGB(x)
	return gam_sRGB(y)
}

// standard white points, defined by 4-figure CIE x,y chromaticities
const D50 = [0.3457 / 0.3585, 1.00000, (1.0 - 0.3457 - 0.3585) / 0.3585]
// const D65 = [0.3127 / 0.3290, 1.00000, (1.0 - 0.3127 - 0.3290) / 0.3290]

const LCH_to_Lab = (LCH: TupleTriple): TupleTriple => [
	LCH[0],
	// Convert from polar form
	LCH[1] * Math.cos(LCH[2] * Math.PI / 180),// a
	LCH[1] * Math.sin(LCH[2] * Math.PI / 180),// b
]

const Lab_to_XYZ = (Lab: TupleTriple): TupleTriple => {
	// Convert Lab to D50-adapted XYZ
	// http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
	const Îº = 24389/27   // 29^3/3^3
	const Îµ = 216/24389  // 6^3/29^3
	const f = []

	// compute f, starting with the luminance-related term
	f[1] = (Lab[0] + 16)/116
	f[0] = Lab[1]/500 + f[1]
	f[2] = f[1] - Lab[2]/200

	const xyz = [
		Math.pow(f[0],3) > Îµ ? Math.pow(f[0],3)            : (116*f[0]-16)/Îº,
		Lab[0] > Îº * Îµ      ? Math.pow((Lab[0]+16)/116,3) : Lab[0]/Îº,
		Math.pow(f[2],3) > Îµ ? Math.pow(f[2],3)            : (116*f[2]-16)/Îº,
	]

	// Compute XYZ by scaling xyz by reference white
	return xyz.map((value, i) => value * D50[i]) as TupleTriple
}

const D50_to_D65 = (XYZ: TupleTriple) => {
	// Bradford chromatic adaptation from D50 to D65
	const M: TupleTriple[] = [
		[  0.9554734527042182,   -0.023098536874261423,  0.0632593086610217   ],
		[ -0.028369706963208136,  1.0099954580058226,    0.021041398966943008 ],
		[  0.012314001688319899, -0.020507696433477912,  1.3303659366080753   ],
	]
	return multiplyMatrices(M, XYZ)
}

const XYZ_to_lin_sRGB = (XYZ: TupleTriple): TupleTriple => {
	// convert XYZ to linear-light sRGB
	const M: TupleTriple[] = [
		[  3.2409699419045226,  -1.537383177570094,   -0.4986107602930034  ],
		[ -0.9692436362808796,   1.8759675015077202,   0.04155505740717559 ],
		[  0.05563007969699366, -0.20397695888897652,  1.0569715142428786  ],
	]
	return multiplyMatrices(M, XYZ)
}

// convert an array of linear-light sRGB values in the range 0.0-1.0
// to gamma corrected form
// https://en.wikipedia.org/wiki/SRGB
// Extended transfer function:
// For negative values, linear portion extends on reflection
// of axis, then uses reflected pow below that
const gam_sRGB = (RGB: any) => RGB.map((val: any) => {
	const sign = val < 0? -1 : 1
	const abs = Math.abs(val)
	return abs > 0.0031308
		? sign * (1.055 * Math.pow(abs, 1/2.4) - 0.055)
		: 12.92 * val
})

/**
 * Simple matrix (and vector) multiplication
 * Warning: No error handling for incompatible dimensions!
 */
// A is m x n. B is n x p. product is m x p.
const multiplyMatrices = (A: TupleTriple[], V: TupleTriple): TupleTriple => {
	const B = V.map(x => [x])
	const p = B[0].length
	const B_cols = B[0].map((_, i) => B.map(x => x[i]))// transpose B
	const productMat = A.map(row => B_cols.map(col => {
		if (!Array.isArray(row)) {
			return col.reduce((a, c) => a + c * row, 0)
		}

		return row.reduce((a, c, i) => a + c * (col[i] || 0), 0)
	}))

	if (p === 1) {
		return productMat.map(x => x[0]) as any// Avoid [[a], [b], [c], ...]]
	}
	else throw new Error(`invalid matrix mult ${A} ${V}`)
}
