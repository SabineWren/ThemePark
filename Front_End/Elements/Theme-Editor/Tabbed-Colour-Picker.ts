import * as chroma from "chroma.ts"
import { css, html, LitElement} from "lit"
import { customElement, property } from "lit/decorators.js"
import { createRef, Ref, ref } from "lit/directives/ref.js"
import { Shared } from "Elements/Style.js"
import { ThemeProvider } from "Providers/Theme.js"
import { ToStringHsl, ToStringHslCommas } from "Themes/Lib/Colours.js"

export const ToStringLchCommas = (colour: chroma.Color) => {
	const [l,c,h] = colour.lch()
	return `lch(${l.toFixed(1)}%, ${c.toFixed(0)}, ${h.toFixed(0)}°)`
}

@customElement("tabbed-colour-picker")
export class TabbedColourPicker extends LitElement {
	@property({ reflect: true }) variant: keyof ThemeColours
	private key: keyof ColourRange = "Min"
	private themeProvider = new ThemeProvider(this)
	private pickerRef: Ref<SlColorPicker> = createRef()
	private reapplyColoursThrottled = throttleFactory(() => this.themeProvider.ReapplyThemeColours())
	private editColour() {
		const pickerColour = this.pickerRef.value!.value
		const colours = this.themeProvider.GetTheme()
			.TokensColourTheme[this.variant]
		colours[this.key] = chroma.color(pickerColour)
		this.reapplyColoursThrottled()
		this.requestUpdate()
		this.dispatchEvent(new Event("change"))
	}
	private editKey(key: keyof ColourRange) {
		this.key = key
		this.requestUpdate()
		this.dispatchEvent(new Event("change"))
	}
	static override get styles() { return [Shared, css`
:host { display: flex; gap: var(--spacing); }

sl-tab::part(base) {
	width: 100%;
	padding: var(--sl-spacing-medium); }

sl-tag { min-width: unset; }
sl-tag::part(content) { min-width: 2em; }
sl-tag::part(base):hover { cursor: pointer; }
sl-tag::part(base) {
	background: var(--background); }
sl-tag::part(content) { color: var(--colour); }

sl-color-picker {
	--grid-width: 320px; }
sl-color-picker, sl-color-picker::part(base) {
	box-shadow: none; }
sl-color-picker::part(swatches) { display: none; }
	`] }
	override render() {
		const theme = this.themeProvider.GetTheme()
		const colours = theme.TokensColourTheme[this.variant]
		const baseColours = Object.entries(colours).map(([k,c]) =>
			({ key: k as keyof ColourRange, Css: ToStringHsl(c), L: c.lch()[0] }))

		const selectedColour = colours[this.key]
		const format = this.pickerRef.value?.format ?? "hsl"
		const value = format === "hex" ? selectedColour.hex()
			: format === "rgb" ? toStringRgb(selectedColour)
			: ToStringHslCommas(selectedColour)

		return html`
<div style="flex; flex-direction: column;">
	<sl-tab-group placement="start">
		${baseColours.map(({ key, Css, L }) => html`
		<sl-tab slot="nav"
			@click=${() => this.editKey(key)}>
			<div style="width: 100%; font-size: 1.2em; font-weight: 600; margin-right: 1rem;"
				>${getColourName(theme, key)}
			</div>
			<sl-tag
				style="--background: ${Css}; --colour: ${L > 50.0 ? "black" : "white"};"
				variant="${this.variant}"
				size="medium"
				>${L.toFixed(1)}
			</sl-tag>
		</sl-tab>`)}
	</sl-tab-group>
	<mode-light-dark></mode-light-dark>
</div>

<sl-color-picker inline
	${ref(this.pickerRef)}
	@sl-change=${() => this.editColour()}
	format="${format}"
	value="${value}"
></sl-color-picker>`
	}
}

const getColourName = (theme: ThemeSpecification, key: keyof ColourRange): string => {
	switch (key) {
	case "Min": return theme.IsLight ? "Lightest" : "Darkest"
	case "C500": return "Button Hover"
	case "C600": return "Button"
	case "Max": return theme.IsLight ? "Darkest" : "Lightest"
	}
}
const toStringRgb = (c: chroma.Color) => {
	const [r,g,b] = c.rgb()
	return `rgb(${r}, ${g}, ${b})` }

const throttleFactory = (foo: () => any) => {
	let isThrottled = false
	const fire = () => { foo(); isThrottled = false }
	return () => {
		if (isThrottled) { return }
		isThrottled = true
		setTimeout(fire, 50)
	}
}
