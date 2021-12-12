import * as chroma from "chroma.ts"
import { css, unsafeCSS } from "lit"
import { ToStringHsl } from "./Colours.js"

const tokenToText = (tokens: { [k: string]: ColourTokenValue }) =>
	Object.entries(tokens)
		.map(([k,v]) => `${k}: ${vToString(v)};`)
		.join("\n")
export const ThemeColoursToCss = (colourTokens: ThemeColourTokens) => css`
:root {
	${unsafeCSS(tokenToText(colourTokens))}
}`

export const ThemeToCss = (spec: ThemeSpecification) => css`
body.${unsafeCSS(spec.CssName)} {
	background: var(${unsafeCSS(spec.TokenColourBackground)});
	color: var(${unsafeCSS(spec.TokenColourText)});
}
${spec.ComponentPartsCss}
:root,
:host,
.${unsafeCSS(spec.CssName)} {
	${unsafeCSS(tokenToText(spec.TokensShoelace))}
}`

const getIsColour = (v: ColourTokenValue): v is chroma.Color =>
	(v as chroma.Color).alpha !== undefined
const vToString = (v: ColourTokenValue): string => {
	if (getIsColour(v)) return ToStringHsl(v)
	if (typeof v === "string") return v
	return `${v.XYBlurSpread} ${vToString(v.Colour)}`
}
