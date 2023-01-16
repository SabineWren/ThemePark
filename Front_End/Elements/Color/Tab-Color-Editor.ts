import * as chroma from "chroma.ts"
import { css, html, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"
import { live } from "lit/directives/live.js"
import { createRef, Ref, ref } from "lit/directives/ref.js"
import { ToStringHsl, ToStringHslCommas } from "Lib/Colors.js"
import { Shared } from "Elements/Style.js"
import { Tokenize } from "Platform_Targets/Shoelace.js"
import { ThemeProvider } from "Providers/Theme.js"

const style = css`
:host {
	display: grid;
	grid-template-columns: auto 1fr auto;
	gap: 1.5rem;
}

.swatch {
	display: inline-block;
	flex-basis: 1rem; flex-grow: 1;
	min-width: 1rem;
	height: 62px;
	border-radius: 2px; }

sl-tab-group[invert-primary] {
	--sl-color-primary-600: var(--sl-color-warning-600); }
sl-tab::part(base) {
	width: 100%;
	padding: var(--sl-spacing-medium); }

sl-tag { min-width: unset; }
sl-tag::part(content) { min-width: 2em; }
sl-tag::part(base):hover { cursor: pointer; }
sl-tag::part(base) {
	background: var(--background); }
sl-tag::part(content) { color: var(--color); }

sl-color-picker {
	--grid-width: 360px; }
sl-color-picker, sl-color-picker::part(base) {
	box-shadow: none; }
sl-color-picker::part(swatches) { display: none; }`

@customElement("tab-color-editor")
class _ele extends LitElement {
	@property({ reflect: true }) variant: keyof ThemeColors
	private key: keyof ColorRange = "Min"
	private themeProvider = new ThemeProvider(this)
	private pickerRef: Ref<SlColorPicker> = createRef()
	private getSelectedColor = () => {
		const colors = this.themeProvider.GetColorsVariant(this.variant)
		const selectedColor = colors[this.key]
		const format = this.pickerRef.value?.format ?? "hsl"
		return format === "hex" ? selectedColor.hex()
			: format === "rgb" ? toStringRgb(selectedColor)
			: ToStringHslCommas(selectedColor)
	}
	private editColor() {
		const oldValue = this.getSelectedColor()
		const newValue = this.pickerRef.value!.value
		// Setting the value of sl-color-picker triggers change without equality check
		if (newValue === oldValue) { return }
		this.themeProvider.SetColorsVariant(
			this.variant, this.key, chroma.color(newValue))
		this.requestUpdate()
	}
	private editKey(key: keyof ColorRange) {
		this.key = key
		this.requestUpdate()
	}
	// sl-color-picker overrides the initial value with white
	// Need to use the 'live' directive and reset the value on 2nd render
	protected override firstUpdated(_: any): void { this.requestUpdate() }
	static override styles = [Shared, style]
	override render() {
		const colors = this.themeProvider.GetColorsVariant(this.variant)
		const baseColors = Object.entries(colors).map(([k,c]) =>
			({ key: k as keyof ColorRange, Css: ToStringHsl(c), L: c.lch()[0] }))

		const value = this.getSelectedColor()
		const tokens = Tokenize(this.variant, colors)
		return html`
<div style="grid-column: 1 / span 3; display: flex; gap: 5px; width: 100%;">
	${Object.entries(tokens).map(([k,v]) => html`
	<div class="swatch" style="background: var(${k});">
		<sl-tooltip content="${toStringLchCommas(v)}" .distance=${0}>
			<div style="width: 100%; height: 100%;"></div>
		</sl-tooltip>
	</div>`)}
</div>

<sl-tab-group placement="start" ?invert-primary=${this.variant === "primary"}>
	${baseColors.map(({ key, Css, L }) => html`
	<sl-tab slot="nav"
		@click=${() => this.editKey(key)}>
		<div style="width: 100%; font-size: 1.2em; font-weight: 600; margin-right: 1rem;"
			>${this.getColorName(key)}
		</div>
		<sl-tag
			style="--background: ${Css}; --color: ${L > 50.0 ? "black" : "white"};"
			variant="${this.variant}"
			size="medium"
			>${L.toFixed(1)}
		</sl-tag>
	</sl-tab>`)}
</sl-tab-group>

<sl-color-picker inline
	${ref(this.pickerRef)}
	@sl-change=${() => this.editColor()}
	format="hsl" .value=${live(value)}
></sl-color-picker>

<div style="white-space: nowrap;">
	${Object.values(tokens).map(c => html`
	<div style="font-weight: 600;">${ToStringHsl((c as chroma.Color))};</div>`)}
</div>
`
	}
	private getColorName = (key: keyof ColorRange): string => {
		// TODO will soon remove this method
		// Will switch to this.themeProvider.GetMode
		const isLight = this.themeProvider.GetIsLight()
		switch (key) {
		case "Min": return isLight ? "Lightest" : "Darkest"
		case "C500": return "Button Hover"
		case "C600": return "Button"
		case "Max": return isLight ? "Darkest" : "Lightest"
		}
	}
}

const toStringLchCommas = (color: chroma.Color) => {
	const [l,c,h] = color.lch()
	return `lch(${l.toFixed(1)}%, ${c.toFixed(0)}, ${h.toFixed(0)}°)`
}

const toStringRgb = (c: chroma.Color) => {
	const [r,g,b] = c.rgb()
	return `rgb(${r}, ${g}, ${b})` }
