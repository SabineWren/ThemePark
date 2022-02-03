import * as chroma from "chroma.ts"
import { html, LitElement} from "lit"
import { customElement, property } from "lit/decorators.js"
import { createRef, Ref, ref } from "lit/directives/ref.js"
import { throttle } from "@shoelace-style/shoelace/dist/internal/throttle.js"
import { Shared } from "Elements/Style.js"
import { ThemeProvider } from "Providers/Theme.js"
import { ToStringHsl, ToStringHslCommas } from "Themes/Lib/Colours.js"
import { SlKeyPc, Tokenize, TokenizeRange } from "Themes/Platform_Targets/Shoelace.js"
import { Style } from "./Style.js"

const toStringRgb = (c: chroma.Color) => {
	const [r,g,b] = c.rgb()
	return `rgb(${r}, ${g}, ${b})` }

@customElement("theme-editor")
export class TokenGenerator extends LitElement {
	@property({ reflect: true }) type: SemanticColour
	private pickerRef: Ref<SlColorPicker> = createRef()
	private themeProvider = new ThemeProvider(this)
	private updateThemeThrottled = throttle(() => this.themeProvider.UpdateTheme(), 50)
	override firstUpdated() { this.requestUpdate() }
	static override get styles() { return [Shared, Style] }
	private index = 0
	private rangeKey: keyof ColourRange = "CMin_Start_Bg"
	private colourChange() {
		const pickerColour = this.pickerRef.value!.value
		const colours = this.getColours()
		if (Array.isArray(colours)) {
			colours[this.index] = chroma.color(pickerColour)
		} else {
			colours[this.rangeKey] = chroma.color(pickerColour)
		}
		this.updateThemeThrottled()
		this.requestUpdate()
	}
	private getColours() {
		const theme = this.themeProvider.GetTheme()
		const key = SlKeyPc(this.type)
		return theme.TokensColourTheme[key]
	}
	override render() {
		const theme = this.themeProvider.GetTheme()
		const colours = theme.TokensColourTheme[SlKeyPc(this.type)]
		const tokens = Array.isArray(colours)
			? Tokenize(colours, this.type)
			: TokenizeRange(colours, this.type)

		const coloursArray = Array.isArray(colours) ? colours : Object.values(colours)
		const baseColours = coloursArray
			.map(c => ({ Colour: c, Css: ToStringHsl(c), L: c.lch()[0] }))
		const selectedColour = baseColours[this.index].Colour

		const format = this.pickerRef.value?.format ?? "hsl"
		const value = format === "hex" ? selectedColour.hex()
			: format === "rgb" ? toStringRgb(selectedColour)
			: ToStringHslCommas(selectedColour)
		return html`
<sl-card>
	<div class="flex" style="gap: 5px; align-items: center;">
		${baseColours.map(({ Colour, Css, L }, i) => html`
		<sl-tooltip content="${toStringLchCommas(Colour)}">
			<sl-tag
				style="--background: ${Css}; --colour: ${L > 50.0 ? "black" : "white"};"
				type="${i === this.index ? "danger" : "neutral"}"
				size="medium"
				?pill=${i === this.index}
				@click=${() => { this.index = i; this.requestUpdate() }}
			>${L.toFixed(1)}</sl-tag>
		</sl-tooltip>`)}
	</div>

	<div class="flex" style="gap: 5px;">
		${Object.keys(tokens).map(k => html`
		<div class="swatch" style="background: var(${k});"></div>`)}
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

// Using a table because grid doesn't copy line breaks correctly,
// and varies copy behavior between browsers
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

/*
<sl-tooltip content="Sort by LCH brightness">
</sl-tooltip>
*/