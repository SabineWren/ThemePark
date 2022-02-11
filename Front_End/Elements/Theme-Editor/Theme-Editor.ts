import * as chroma from "chroma.ts"
import { css, html, LitElement} from "lit"
import { customElement, property } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"
import { ThemeProvider } from "Providers/Theme.js"
import { ToStringHsl } from "Themes/Lib/Colours.js"
import { Tokenize } from "Themes/Platform_Targets/Shoelace.js"
import { ToStringLchCommas } from "./Tabbed-Colour-Picker.js"

const style = css`
:host {
	display: inline-block;
	--spacing: 1.5rem; }
.flex { display: flex; gap: var(--spacing); }

sl-card {
	margin: 0 auto; }
sl-card::part(base) {
	--padding: var(--spacing);
	box-shadow: var(--sl-shadow-large); }
sl-card::part(body) {
	display: flex; flex-direction: column; gap: var(--spacing); }

.toggle-btn {
	display: flex;
	flex-direction: column;
	align-items: flex-start; }

.swatch {
	display: inline-block;
	flex-basis: 1rem; flex-grow: 1;
	min-width: 1rem;
	height: 62px;
	border-radius: 2px; }`

@customElement("theme-editor")
class _ele extends LitElement {
	@property({ reflect: true }) variant: keyof ThemeColours
	private themeProvider = new ThemeProvider(this)
	override firstUpdated() { this.requestUpdate() }
	static override get styles() { return [Shared, style] }
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
		<div style="width: 12em;">
			${Object.values(tokens).map(c => html`
			<div style="font-weight: 600;">${ToStringHsl((c as chroma.Color))};</div>`)}
		</div>
	</div>
</sl-card>`
	}
}
