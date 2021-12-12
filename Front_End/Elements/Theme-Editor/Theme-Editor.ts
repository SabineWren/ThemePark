import * as chroma from "chroma.ts"
import { html, LitElement} from "lit"
import { customElement, property } from "lit/decorators.js"
import { createRef, Ref, ref } from "lit/directives/ref.js"
import { throttle } from "@shoelace-style/shoelace/dist/internal/throttle.js"
import { Shared } from "Elements/Style.js"
import { ThemeProvider } from "Providers/Theme.js"
import { ColourToCss } from "Themes/Lib/DesignTokens.js"
import { SlKeyPc, Tokenize } from "Themes/Platform_Targets/Shoelace.js"
import { Style } from "./Style.js"

@customElement("theme-editor")
export class TokenGenerator extends LitElement {
	@property({ reflect: true }) type: SemanticColour
	private pickerRef: Ref<SlColorPicker> = createRef()
	private themeProvider = new ThemeProvider(this)
	private updateThemeColours = throttle(() => this.themeProvider.UpdateTheme(), 50)
	override firstUpdated() { this.requestUpdate() }
	static override get styles() { return [Shared, Style] }
	private index = 0
	private colourAdd() {
		const colours = this.getColours()
		const clone = colours[this.index].darker(0)
		colours.splice(this.index, 0, clone)
		this.themeProvider.UpdateTheme()
		this.requestUpdate()
	}
	private colourChange() {
		const pickerColour = this.pickerRef.value!.value
		const colours = this.getColours()
		colours[this.index] = chroma.color(pickerColour)
		this.updateThemeColours()
		this.requestUpdate()
	}
	private colourDelete() {
		const theme = this.themeProvider.GetTheme()
		const colours = theme.TokensColourTheme[SlKeyPc(this.type)]
		colours.splice(this.index, 1)
		this.index = this.index > 0 ? this.index - 1 : 0
		this.themeProvider.SetTheme(theme)
	}
	private colourSort() {
		const colours = this.getColours()
		const selection = colours[this.index]
		colours.sort((a,b) => a.lch()[0] - b.lch()[0])
		this.index = colours.indexOf(selection)
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
		<sl-tooltip content="Delete Colour (refresh page to reset)">
			<sl-icon-button name="trash" type="danger"
				@click=${() => this.colourDelete()}
			></sl-icon-button>
		</sl-tooltip>
		<sl-tooltip content="Add Colour (refresh page to reset)">
			<sl-icon-button name="plus-square" type="success"
				@click=${() => this.colourAdd()}
			></sl-icon-button>
		</sl-tooltip>
		<sl-tooltip content="Sort by LCH brightness">
			<sl-icon-button name="sort-numeric-up" type="success"
				@click=${() => this.colourSort()}
			></sl-icon-button>
		</sl-tooltip>
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
				@sl-change=${() => this.colourChange()}
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
