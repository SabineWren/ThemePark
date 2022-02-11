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
		return html`
<sl-card>
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
			${Object.values(tokens).map(c => html`
			<div style="font-weight: 600;">${ToStringHsl((c as chroma.Color))};</div>`)}
		</div>
	</div>
</sl-card>`
	}
}
