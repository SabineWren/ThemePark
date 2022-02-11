import * as chroma from "chroma.ts"
import { html, LitElement} from "lit"
import { customElement, property } from "lit/decorators.js"
import { createRef, Ref, ref } from "lit/directives/ref.js"
import { Shared } from "Elements/Style.js"
import { ThemeProvider } from "Providers/Theme.js"
import { ToStringHslCommas } from "Themes/Lib/Colours.js"
import { Tokenize } from "Themes/Platform_Targets/Shoelace.js"
import { Style } from "./Style.js"
import { TabSelectColourToken, ToStringLchCommas } from "./Tab-Select-Colour-Token.js"

const toStringRgb = (c: chroma.Color) => {
	const [r,g,b] = c.rgb()
	return `rgb(${r}, ${g}, ${b})` }

@customElement("theme-editor")
class _ele extends LitElement {
	@property({ reflect: true }) variant: keyof ThemeColours
	private pickerRef: Ref<SlColorPicker> = createRef()
	private themeProvider = new ThemeProvider(this)
	private reapplyColoursThrottled = throttleFactory(() => this.themeProvider.ReapplyThemeColours())
	override firstUpdated() { this.requestUpdate() }
	static override get styles() { return [Shared, Style] }
	private getTokenKey = (): keyof ColourRange =>
		$<TabSelectColourToken>(this, "tab-select-colour-token")?.token ?? "Min"
	private getColours = () => this.themeProvider.GetTheme()
		.TokensColourTheme[this.variant]
	private editColour() {
		const pickerColour = this.pickerRef.value!.value
		const colours = this.getColours()
		colours[this.getTokenKey()] = chroma.color(pickerColour)
		this.reapplyColoursThrottled()
		this.requestUpdate()
	}
	override render() {
		const theme = this.themeProvider.GetTheme()
		const colours = theme.TokensColourTheme[this.variant]
		const tokens = Tokenize(this.variant, colours)

		const selectedColour = colours[this.getTokenKey()]
		const format = this.pickerRef.value?.format ?? "hsl"
		const value = format === "hex" ? selectedColour.hex()
			: format === "rgb" ? toStringRgb(selectedColour)
			: ToStringHslCommas(selectedColour)

		const renderContrastBody = (c: 0 | 50 | 100 | 200) => html`
		<sl-button ?outline=${theme.ContrastBody === c}
			@click=${() => { theme.ContrastBody = c; this.themeProvider.ReapplyTheme() }}>${c}
		</sl-button>`
		const renderContrastPanel = (c: 0 | 50 | 100 | 200) => html`
		<sl-button ?outline=${theme.ContrastPanel === c}
			@click=${() => { theme.ContrastPanel = c; this.themeProvider.ReapplyTheme() }}>${c}
		</sl-button>`
		const renderContrastText = (c: 800 | 900 | 950 | 1000) => html`
		<sl-button ?outline=${theme.ContrastText === c}
			@click=${() => { theme.ContrastText = c; this.themeProvider.ReapplyTheme() }}>${c}
		</sl-button>`

		return html`
<sl-card>
	<tab-select-colour-token variant=${this.variant}
		@change=${() => this.requestUpdate()}>
	</tab-select-colour-token>

	<div class="toggle-btn">
		Body Contrast
		<sl-button-group>
			${renderContrastBody(0)}
			${renderContrastBody(50)}
			${renderContrastBody(100)}
			${renderContrastBody(200)}
		</sl-button-group>
	</div>
	<div class="toggle-btn">
		Panel Contrast
		<sl-button-group>
			${renderContrastPanel(0)}
			${renderContrastPanel(50)}
			${renderContrastPanel(100)}
			${renderContrastPanel(200)}
		</sl-button-group>
	</div>
	<div class="toggle-btn">
		Text Contrast
		<sl-button-group>
			${renderContrastText(800)}
			${renderContrastText(900)}
			${renderContrastText(950)}
			${renderContrastText(1000)}
		</sl-button-group>
	</div>

	<div class="flex" style="gap: 5px;">
		${Object.entries(tokens).map(([k,v]) => html`
		<sl-tooltip content="${ToStringLchCommas(v)}">
			<div class="swatch" style="background: var(${k});"></div>
		</sl-tooltip>`)}
	</div>

	<div class="flex">
		<div class="left">
			<sl-color-picker inline
				${ref(this.pickerRef)}
				@sl-change=${() => this.editColour()}
				format="${format}"
				value="${value}"
			></sl-color-picker>
		</div>
		<div class="right">
			${renderCssText(Object.entries(tokens))}
			<theme-exporter></theme-exporter>
		</div>
	</div>
</sl-card>`
	}
}

// Using a table because grid doesn't copy line breaks correctly,
// and varies clipboard behavior between browsers.
// We strip the tabs that table cells generate on copy.
const renderCssText = (tokensCss: [string,ColourPlaceholder][]) => html`
<table @copy=${(e: ClipboardEvent) => {
	const text = window.getSelection()?.toString().replace(/\t/g, " ") ?? ""
	e.clipboardData?.setData("text/plain", text)
	e.preventDefault()
}}>
	<tr class="ital no-click no-select">
		<td colspan="2">Copy & paste colour tokens</td>
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

const throttleFactory = (foo: () => any) => {
	let isThrottled = false
	const fire = () => { foo(); isThrottled = false }
	return () => {
		if (isThrottled) { return }
		isThrottled = true
		setTimeout(fire, 50)
	}
}
