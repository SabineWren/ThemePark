import * as chroma from "chroma.ts"
import { html, LitElement} from "lit"
import { customElement, property } from "lit/decorators.js"
import { createRef, Ref, ref } from "lit/directives/ref.js"
import { throttle } from "@shoelace-style/shoelace/dist/internal/throttle.js"
import { Shared } from "Elements/Style.js"
import { ThemeProvider } from "Providers/Theme.js"
import { ToStringHsl, ToStringHslCommas } from "Themes/Lib/Colours.js"
import { Tokenize } from "Themes/Platform_Targets/Shoelace.js"
import { Style } from "./Style.js"

const toStringRgb = (c: chroma.Color) => {
	const [r,g,b] = c.rgb()
	return `rgb(${r}, ${g}, ${b})` }

@customElement("theme-editor")
export class TokenGenerator extends LitElement {
	@property({ reflect: true }) variant: keyof ThemeColours
	private pickerRef: Ref<SlColorPicker> = createRef()
	private themeProvider = new ThemeProvider(this)
	private updateThemeThrottled = throttle(() => this.themeProvider.UpdateTheme(), 50)
	override firstUpdated() { this.requestUpdate() }
	static override get styles() { return [Shared, Style] }
	private rangeKey: keyof ColourRange = "Min"
	private colourChange() {
		const pickerColour = this.pickerRef.value!.value
		const colours = this.getColours()
		colours[this.rangeKey] = chroma.color(pickerColour)
		this.updateThemeThrottled()
		this.requestUpdate()
	}
	private getColours() {
		const theme = this.themeProvider.GetTheme()
		return theme.TokensColourTheme[this.variant]
	}
	override render() {
		const theme = this.themeProvider.GetTheme()
		const colours = theme.TokensColourTheme[this.variant]
		const tokens = Tokenize(this.variant, colours)
		const baseColours = Object.entries(colours).map(([k,c]) =>
			({ key: k as keyof ColourRange, Colour: c, Css: ToStringHsl(c), L: c.lch()[0] }))
		const selectedColour = baseColours
			.find(c => c.key === this.rangeKey)!.Colour

		const format = this.pickerRef.value?.format ?? "hsl"
		const value = format === "hex" ? selectedColour.hex()
			: format === "rgb" ? toStringRgb(selectedColour)
			: ToStringHslCommas(selectedColour)
		return html`
<sl-card>
	<sl-tab-group placement="start" id="colour-keys">
		${baseColours.map(({ key, Colour, Css, L }) => html`
		<sl-tab slot="nav"
			@click=${() => { this.rangeKey = key; this.requestUpdate() }}>
			<div style="width: 100%; margin-right: 1em;">${getColourName(theme, key)}</div>
			<sl-tooltip placement="right" content="${toStringLchCommas(Colour)}">
				<sl-tag
					style="--background: ${Css}; --colour: ${L > 50.0 ? "black" : "white"};"
					type="${this.variant}"
					size="medium"
					>${L.toFixed(1)}
				</sl-tag>
			</sl-tooltip>
		</sl-tab>`)}
	</sl-tab-group>

	<div class="flex" style="gap: 5px;">
		${Object.entries(tokens).map(([k,v]) => html`
		<sl-tooltip content="${toStringLchCommas(v)}">
			<div class="swatch" style="background: var(${k});"></div>
		</sl-tooltip>`)}
	</div>

	<div class="flex">
		<div class="left">
			<sl-color-picker inline
				${ref(this.pickerRef)}
				@sl-change=${() => this.colourChange()}
				format="${format}"
				value="${value}"
			></sl-color-picker>
		</div>
		<div class="right">
			<div class="no-select" style="display: flex; gap: 0.5em; margin-bottom: 0.5em;">
				<sl-tooltip content="Export base colours as Theme Park specification.">
					<sl-button type="success" size="small" outline
						>Export Theme
					</sl-button>
				</sl-tooltip>
				<sl-tooltip content="Export entire theme compiled to Shoelace design tokens. A complete app also requires shoelace-tokens.css">
					<sl-button type="success" size="small" outline
						>Export Stylesheet
					</sl-button>
				</sl-tooltip>
			</div>
			${renderCssText(Object.entries(tokens))}
		</div>
	</div>
</sl-card>`
	}
}

const getColourName = (theme: ThemeSpecification, key: keyof ColourRange): string => {
	switch (key) {
	case "Min": return theme.IsLight ? "Lightest" : "Darkest"
	case "C500": return theme.ContrastButton === 600 ? "Button Hover" : "Button Background"
	case "C600": return theme.ContrastButton === 600 ? "Button Background" : "Button Hover"
	case "Max": return theme.IsLight ? "Darkest" : "Lightest"
	}
}

// Using a table because grid doesn't copy line breaks correctly,
// and varies copy behavior between browsers
// TODO this adds tabs. Maybe just use a textarea and add a space?
const renderCssText = (tokensCss: [string,ColourPlaceholder][]) => html`
<table>
	<tr class="ital no-click no-select">
		<td colspan="2">... or Copy & paste colour tokens</td>
	</tr>
	<tr style="height: 0.5em;"></tr>
	${tokensCss.map(([k,c]) => html`
	<tr>
		<td style="padding-right: 0.8em;">${k}:</td>
		<td class="emph">${hslToString((c as chroma.Color).hsl())};</td>
	</tr>`)}
</table>`
const hslToString = ([h,s,l]: [number, number, number]) =>
	`hsl(${h.toFixed(0)} ${(s*100).toFixed(1)}% ${(l*100).toFixed(1)}%)`

const toStringLchCommas = (colour: chroma.Color) => {
	const [l,c,h] = colour.lch()
	return `lch(${l.toFixed(1)}%, ${c.toFixed(0)}, ${h.toFixed(0)}°)`
}
