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
	private updateThemeColoursThrottled = throttle(() => this.themeProvider.ReapplyThemeColours(), 50)
	override firstUpdated() { this.requestUpdate() }
	static override get styles() { return [Shared, Style] }
	private rangeKey: keyof ColourRange = "Min"
	private editColour() {
		const pickerColour = this.pickerRef.value!.value
		const colours = this.getColours()
		colours[this.rangeKey] = chroma.color(pickerColour)
		this.updateThemeColoursThrottled()
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
		<sl-tooltip content="${toStringLchCommas(v)}">
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

			<sl-button-group style="margin-top: 0.5em;">
				<sl-button type="success" size="small" outline>Save Theme</sl-button>
				<sl-dropdown placement="bottom-end">
					<sl-button slot="trigger" type="success" size="small" outline caret></sl-button>
					<sl-menu>
						<sl-menu-item>Export Shoelace Colour Tokens</sl-menu-item>
						<sl-menu-item><a href="/shoelace-tokens.css" download>Export Shoelace Shared CSS</a></sl-menu-item>
					</sl-menu>
				</sl-dropdown>
			</sl-button-group>
		</div>
	</div>
</sl-card>`
	}
}

const getColourName = (theme: ThemeSpecification, key: keyof ColourRange): string => {
	switch (key) {
	case "Min": return theme.IsLight ? "Lightest" : "Darkest"
	case "C500": return "Button Hover"
	case "C600": return "Button Background"
	case "Max": return theme.IsLight ? "Darkest" : "Lightest"
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

const toStringLchCommas = (colour: chroma.Color) => {
	const [l,c,h] = colour.lch()
	return `lch(${l.toFixed(1)}%, ${c.toFixed(0)}, ${h.toFixed(0)}°)`
}
