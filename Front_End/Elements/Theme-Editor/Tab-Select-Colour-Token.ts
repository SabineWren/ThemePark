import * as chroma from "chroma.ts"
import { css, html, LitElement} from "lit"
import { customElement, property } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"
import { ThemeProvider } from "Providers/Theme.js"
import { ToStringHsl } from "Themes/Lib/Colours.js"

export const ToStringLchCommas = (colour: chroma.Color) => {
	const [l,c,h] = colour.lch()
	return `lch(${l.toFixed(1)}%, ${c.toFixed(0)}, ${h.toFixed(0)}°)`
}

@customElement("tab-select-colour-token")
export class TabSelectColourToken extends LitElement {
	@property({ reflect: true }) variant: keyof ThemeColours
	@property({ reflect: true }) token: keyof ColourRange = "Min"
	private themeProvider = new ThemeProvider(this)
	static override get styles() { return [Shared, css`
sl-tab::part(base) { width: 100%; padding: 0.5rem; }
sl-tag { min-width: unset; }
sl-tag::part(base):hover { cursor: pointer; }
sl-tag::part(base) { background: var(--background); }
sl-tag::part(content) { color: var(--colour); }
	`] }
	override render() {
		const theme = this.themeProvider.GetTheme()
		const colours = theme.TokensColourTheme[this.variant]
		const baseColours = Object.entries(colours).map(([k,c]) =>
			({ key: k as keyof ColourRange, Colour: c, Css: ToStringHsl(c), L: c.lch()[0] }))
		return html`
<sl-tab-group placement="start">
	${baseColours.map(({ key, Colour, Css, L }) => html`
	<sl-tab slot="nav"
		@click=${() => { this.token = key; this.dispatchEvent(new Event("change")) }}>
		<div style="width: 100%; margin-right: 1em;">${getColourName(theme, key)}</div>
		<sl-tooltip placement="right" content="${ToStringLchCommas(Colour)}">
			<sl-tag
				style="--background: ${Css}; --colour: ${L > 50.0 ? "black" : "white"};"
				variant="${this.variant}"
				size="medium"
				>${L.toFixed(1)}
			</sl-tag>
		</sl-tooltip>
	</sl-tab>`)}
</sl-tab-group>`
	}
}

const getColourName = (theme: ThemeSpecification, key: keyof ColourRange): string => {
	switch (key) {
	case "Min": return theme.IsLight ? "Lightest" : "Darkest"
	case "C500": return "Button Hover"
	case "C600": return "Button Background"
	case "Max": return theme.IsLight ? "Darkest" : "Lightest"
	}
}
