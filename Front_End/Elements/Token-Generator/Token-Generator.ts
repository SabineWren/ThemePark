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
	private themeProvider = new ThemeProvider(this)
	private pickerRef: Ref<SlColorPicker> = createRef()
	override firstUpdated() { this.requestUpdate() }
	static override get styles() { return [Shared, Style] }
	private index = 0
	private addColour() {
		const theme = this.themeProvider.GetTheme()
		const colours = theme.TokensColourTheme[SlKeyPc(this.type)]
		const clone = colours[this.index].darker(0)
		colours.push(clone)
		this.sortAndSelect(clone)
		this.themeProvider.UpdateTheme()
		this.requestUpdate()
	}
	private changeColour() {
		const hslInput = this.pickerRef.value!.value
		const theme = this.themeProvider.GetTheme()
		const colours = theme.TokensColourTheme[SlKeyPc(this.type)]
		colours[this.index] = chroma.color(hslInput)
		this.themeProvider.UpdateTheme()
		this.requestUpdate()
	}
	private deleteColour() {
		const theme = this.themeProvider.GetTheme()
		const colours = theme.TokensColourTheme[SlKeyPc(this.type)]
		colours.splice(this.index, 1)
		this.index = this.index > 0 ? this.index - 1 : 0
		this.themeProvider.SetTheme(theme)
	}
	private sortAndSelect(toSelect?: chroma.Color) {
		const theme = this.themeProvider.GetTheme()
		const colours = theme.TokensColourTheme[SlKeyPc(this.type)]
		colours.sort((a,b) => a.lch()[0] - b.lch()[0])
		const index = toSelect ? colours.indexOf(toSelect) : -1
		this.index = index >= 0 ? index : 0
	}
	override render() {
		const theme = this.themeProvider.GetTheme()
		const colours = theme.TokensColourTheme[SlKeyPc(this.type)]
		const tokens = Tokenize(colours, this.type)

		const baseColours = colours
			.map(c => ({ Css: ColourToCss(c), L: c.lch()[0] }))
		return html`
<sl-card>
	<div class="flex" style="gap: 5px;">
		${Object.keys(tokens).map(k => html`
		<div class="swatch" style="background: var(${k});"></div>`)}
	</div>

	<div class="flex" style="gap: 5px; align-items: center;">
		<sl-icon-button name="trash" type="danger"
			@click=${() => this.deleteColour()}
		></sl-icon-button>
		<sl-icon-button name="plus-square" type="success"
			@click=${() => this.addColour()}
		></sl-icon-button>
		${baseColours.map(({ Css, L }, i) => html`
		<sl-tag
			style="--background: ${Css}; --colour: ${L > 50.0 ? "black" : "white"};"
			type="${i === this.index ? "danger" : "neutral"}"
			size="${i === this.index ? "large" : "medium"}"
			@click=${() => { this.index = i; this.requestUpdate() }}
		>${L.toFixed(1)}</sl-tag>`)}
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
