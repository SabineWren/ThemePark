import * as chroma from "chroma.ts"
import { html, LitElement} from "lit"
import { customElement, property } from "lit/decorators.js"
import { createRef, Ref, ref } from "lit/directives/ref.js"
import { Shared } from "Elements/Style.js"
import { ThemeProvider } from "Providers/Theme.js"
import { ColourToCss } from "Themes/Lib/DesignTokens.js"
import { SlKeyPc, Tokenize } from "Themes/Platform_Targets/Shoelace.js"
import { Style } from "./Style.js"

@customElement("token-generator")
export class TokenGenerator extends LitElement {
	@property({ reflect: true }) type: SemanticColour
	private theme = new ThemeProvider(this)
	private pickerRef: Ref<SlColorPicker> = createRef()
	override firstUpdated() { this.requestUpdate() }
	static override get styles() { return [Shared, Style] }
	private index = 0
	private changeColour() {
		// Mutate current theme so only page refresh resets
		const hslInput = this.pickerRef.value!.value
		const theme = this.theme.GetTheme()
		const colours = theme.TokensColourTheme[SlKeyPc(this.type)]
		colours[this.index] = chroma.color(hslInput)

		// More performant than re-applying the entire theme
		const style = $(document, `style#${theme.CssName}`)
		Object.entries(Tokenize(colours, this.type))
			.forEach(([k,v]) => style.style.setProperty(k, ColourToCss(v)))
		this.requestUpdate()
	}
	override render() {
		const theme = this.theme.GetTheme()
		const colours = theme.TokensColourTheme[SlKeyPc(this.type)]
		const tokens = Tokenize(colours, this.type)

		const baseColours = colours
			.map(c => ({ Css: ColourToCss(c), L: c.lch()[0] }))
			.sort((a,b) => a.L - b.L)
		return html`
<sl-card>
	<div class="flex" style="gap: 5px;">
		${Object.keys(tokens).map(k => html`
		<div class="swatch" style="background: var(${k});"></div>`)}
	</div>

	<div class="flex" style="gap: 5px;">
		${baseColours.map(({ Css }) => html`
		<div class="swatch" style="background: ${Css};"></div>`)}
	</div>

	<div class="flex">
		<div class="left">
			<sl-color-picker inline
				${ref(this.pickerRef)}
				@sl-change=${() => this.changeColour()}
				format="hsl" value="${baseColours[this.index].Css}"
			></sl-color-picker>
		</div>
		<div class="right">
			${renderCss(Object.entries(tokens))}
		</div>
	</div>
</sl-card>`
	}
}

// Using a table because grid doesn't copy line breaks correctly,
// and varies copy behavior between browsers
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
