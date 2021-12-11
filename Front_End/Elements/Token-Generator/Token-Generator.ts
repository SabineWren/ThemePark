import * as chroma from "chroma.ts"
import { html, LitElement} from "lit"
import { customElement, property } from "lit/decorators.js"
import { createRef, Ref, ref } from "lit/directives/ref.js"
import { Shared } from "Elements/Style.js"
import { ThemeProvider } from "Providers/Theme.js"
import * as Shoelace from "Themes/Platform_Targets/Shoelace.js"
import { Style } from "./Style.js"

export const ColourTypes = ["primary", "success", "neutral", "warning", "danger"] as const
export type ColourType = typeof ColourTypes[number]

@customElement("token-generator")
export class TokenGenerator extends LitElement {
	@property({ reflect: true }) type: ColourType
	private theme = new ThemeProvider(this)
	private pickerRef: Ref<SlColorPicker> = createRef()
	override firstUpdated() { this.requestUpdate() }
	static override get styles() { return [Shared, Style] }
	private changeColour() {
		const hslInput = this.pickerRef.value!.value
		const colour = chroma.color(hslInput)
		const theme = this.theme.GetTheme()
		const key = getKey(this.type)
		theme.TokensColourTheme[key][0] = colour
		this.theme.SetTheme(theme)
	}
	override render() {
		const theme = this.theme.GetTheme()
		const key = getKey(this.type)
		const tokens = getTokenizer(this.type)(theme.TokensColourTheme[key])
		const tokensCss = Object.entries(tokens)
		const swatches = tokensCss
			.map(([k,_v]) => k)
			.map(k => html`<div class="swatch" style="background: var(${k});"></div>`)
		return html`
<sl-card>
	<div id="result">${swatches}</div>

	<div class="inputs">
		<div class="left">
			<sl-color-picker inline
				${ref(this.pickerRef)}
				@sl-change=${() => this.changeColour()}
				format="hsl" value="hsl(199, 88%, 50%)"
			></sl-color-picker>
		</div>
		<div class="right">
			${renderCss(tokensCss)}
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
const getKey = (t: ColourType): keyof ThemeColours => {
	switch (t) {
	case "danger": return "Danger"
	case "neutral": return "Neutral"
	case "primary": return "Primary"
	case "success": return "Success"
	case "warning": return "Warning"
	}
}

// Using a table because grid doesn't copy correctly,
// and has different line breaks across browsers
const renderCss = (tokensCss: [string,ColourPlaceholder][]) => html`
<table>
	<tr style="font-style: italic; user-select: none; pointer-events: none;">
		<td colspan="2">Copy & paste into your theme</td>
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

/*
<sl-input name="name"
				${ref(this.nameRef)}
				@sl-input=${() => this.requestUpdate()}
				placeholder="Colour Name (ex. primary)"
				value="primary" size="small">
					<sl-icon slot="suffix" name="palette"></sl-icon>
			</sl-input>
*/
