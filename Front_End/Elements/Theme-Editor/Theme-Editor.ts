import * as chroma from "chroma.ts"
import { html, LitElement} from "lit"
import { customElement, property } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"
import { ThemeProvider } from "Providers/Theme.js"
import { ToStringHsl } from "Themes/Lib/Colours.js"
import { Tokenize } from "Themes/Platform_Targets/Shoelace.js"
import { Style } from "./Style.js"
import { ToStringLchCommas } from "./Tabbed-Colour-Picker.js"


@customElement("theme-editor")
class _ele extends LitElement {
	@property({ reflect: true }) variant: keyof ThemeColours
	private themeProvider = new ThemeProvider(this)
	override firstUpdated() { this.requestUpdate() }
	static override get styles() { return [Shared, Style] }
	override render() {
		const theme = this.themeProvider.GetTheme()
		const colours = theme.TokensColourTheme[this.variant]
		const tokens = Tokenize(this.variant, colours)

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

	<div class="flex" style="gap: 5px; width: 100%;">
		${Object.entries(tokens).map(([k,v]) => html`
		<div class="swatch" style="background: var(${k});">
			<sl-tooltip content="${ToStringLchCommas(v)}">
				<div style="width: 100%; height: 100%;"></div>
			</sl-tooltip>
		</div>`)}
	</div>

	<div class="flex">
		<tabbed-colour-picker variant=${this.variant}
			@change=${() => this.requestUpdate()}>
		</tabbed-colour-picker>
		<div>
			${renderCssText(Object.entries(tokens))}
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
		<td class="emph">${ToStringHsl((c as chroma.Color))};</td>
	</tr>`)}
</table>`
