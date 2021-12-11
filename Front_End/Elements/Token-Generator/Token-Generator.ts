import * as chroma from "chroma.ts"
import { html, LitElement} from "lit"
import { customElement, property } from "lit/decorators.js"
import { createRef, Ref, ref } from "lit/directives/ref.js"
import { Shared } from "Elements/Style.js"
import * as Shoelace from "Themes/Platform_Targets/Shoelace.js"
import { Style } from "./Style.js"

export const ColourTypes = ["primary", "success", "neutral", "warning", "danger"] as const
export type ColourType = typeof ColourTypes[number]

@customElement("token-generator")
export class TokenGenerator extends LitElement {
	@property({ reflect: true }) type: ColourType
	private pickerRef: Ref<SlColorPicker> = createRef()
	override firstUpdated() { this.requestUpdate() }
	static override get styles() { return [Shared, Style] }
	override render() {
		const tokenizer = getTokenizer(this.type)
		const tokenize = (hslInput: string) => {
			const baseColour = chroma.color(hslInput)
			const colours = [
				baseColour.desaturate(0.1).luminance(.018),// 50
				baseColour,
				baseColour.saturate(0.45).luminance(.95),// 950
			]
			const tokens = Object.entries(tokenizer(colours))
			const swatches = tokens
				.map(([k,_v]) => k)
				.map(k => html`<div class="swatch" style="background: var(${k});"></div>`)
			return { Swatches: swatches, Tokens: tokens }
		}

		const picker = this.pickerRef.value
		const { Swatches, Tokens } = picker
			? tokenize(picker.value)
			: { Swatches: [], Tokens: [] }
		return html`
<sl-card>
	<div id="result">${Swatches}</div>

	<div class="inputs">
		<div class="left">
			<sl-color-picker inline
				${ref(this.pickerRef)}
				@sl-change=${() => this.requestUpdate()}
				format="hsl" value="hsl(199, 88%, 50%)"
			></sl-color-picker>
		</div>
		<div class="right">
			${renderCss(Tokens)}
		</div>
	</div>
</sl-card>`
	}
}

const getTokenizer = (t: ColourType) => {
	switch (t) {
	case "danger": return Shoelace.TokenizeDanger
	case "neutral": return Shoelace.TokenizeNeutral
	case "primary": return Shoelace.TokenizePrimary
	case "success": return Shoelace.TokenizeSuccess
	case "warning": return Shoelace.TokenizeWarning
	}
}

// Using a table because grid doesn't copy correctly,
// and has different line breaks across browsers
const renderCss = (tokens: [string,Colour][]) => html`
<table>
	<tr style="font-style: italic; user-select: none; pointer-events: none;">
		<td colspan="2">Copy & paste into your theme</td>
	</tr>
	<tr style="height: 0.5em;"></tr>
	${tokens.map(([k,c]) => html`
	<tr>
		<td style="padding-right: 0.8em;">${k}:</td>
		<td class="emph">${hslToString((c as chroma.Color).hsl())};</td>
	</tr>`)}
</table>`
const hslToString = ([h,s,l]: [number, number, number]) =>
	`hsl(${h.toFixed(0)} ${(s*100).toFixed(1)}% ${(l*100).toFixed(1)}%)`

/*
<sl-input name="name"
				${ref(this.nameRef)}
				@sl-input=${() => this.requestUpdate()}
				placeholder="Colour Name (ex. primary)"
				value="primary" size="small">
					<sl-icon slot="suffix" name="palette"></sl-icon>
			</sl-input>
*/
