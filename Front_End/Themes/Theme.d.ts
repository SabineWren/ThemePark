type TupleTriple = [number, number, number]
type Color = import("chroma.ts").Color
type BoxShadow = { XYBlurSpread: string; Color: Color }
type ThemeShadowTokens = { [k: string]: BoxShadow }

type SemanticColorsTuple = readonly ["primary", "success", "neutral", "warning", "danger"]
type ButtonVariant = SemanticColorsTuple[number]

/* Stylesheet has 3 parts:
 * 1. Body css, which normally sets text color and page background
 * 2. Theme colors that apply to root, body, and host
 * 3. Platform-supplied shared css (ex. Shoelace tokens)
 * This probably isn't a good API, as theme implementors shouldn't
 * need to care about platform tokens. They will need to override
 * component parts as well.
*/

type ThemeSpecification = {
	ContrastBody: | 0 | 50 | 100 | 200
	ContrastPanel: | 0 | 50 | 100
	// Dark themes usually prefer lower values to prevent light bleed
	ContrastText: | 800 | 900 | 950 | 1000

	// Name in kebab-case. Use prefixes to guarantee uniqueness.
	// ex. Nord Dark for Shoelace: sl-nord-polar-night
	CssName: string

	// Light and Dark modes show different dropdowns for theme selection
	IsLight: boolean

	// Name user sees in theme-picker dropdown.
	Label: string

	// Defines the theme implementation.
	// Theme Park interpolates using LCH, then clamps to sRGB.
	// Defaults to grey if not supplied
	TokensColorTheme: ThemeColors
}

// Light theme order: Light -> Dark
// Dark theme order: Dark -> Light
type ColorRange = {
	Min: Color
	C500: Color
	C600: Color
	Max: Color
}
type ThemeColors = {
	danger: ColorRange
	neutral: ColorRange
	primary: ColorRange
	success: ColorRange
	warning: ColorRange
}
