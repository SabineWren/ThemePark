import { css, html, LitElement} from "lit"
import { customElement } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"
import { ThemeProvider } from "Providers/Theme.js"

export const StyleToggleBtn = css`
.toggle-btn {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	user-select: none;
}
/* focus ring (aka border) should be above other buttons when selected */
sl-button[selected] { z-index: 3; }
sl-button[selected]::part(base) {
	border-color: var(--sl-color-primary-200);
	box-shadow: 0 0 10px 4px var(--sl-color-primary-100) inset; }
sl-button[selected]:hover::part(base) {
	border-color: var(--sl-color-success-300);
	box-shadow: 0 0 10px 4px var(--sl-color-success-100) inset; }
`

@customElement("mode-theme-type")
class _lightDark extends LitElement {
	private themeProvider = new ThemeProvider(this)
	static override get styles() { return [Shared, StyleToggleBtn] }
	override render() {
		const theme = this.themeProvider.GetTheme()
		return html`
<div class="toggle-btn"
	>Theme Type
	<sl-button-group>
		<sl-button ?selected=${theme.IsLight}
			@click=${() => { theme.IsLight = true; this.themeProvider.ReapplyTheme() }}>Light
		</sl-button>
		<sl-button ?selected=${!theme.IsLight}
			@click=${() => { theme.IsLight = false; this.themeProvider.ReapplyTheme() }}>Dark
		</sl-button>
	</sl-button-group>
</div>`
	}
}

@customElement("mode-contrast-body")
class _body extends LitElement {
	private themeProvider = new ThemeProvider(this)
	static override get styles() { return [Shared, StyleToggleBtn] }
	override render() {
		const theme = this.themeProvider.GetTheme()
		return html`
<div class="toggle-btn"
	>Body Contrast
	<sl-button-group>
		${([0, 50, 100, 200] as const).map(c => html`
		<sl-button ?selected=${theme.ContrastBody === c}
			@click=${() => { theme.ContrastBody = c; this.themeProvider.ReapplyTheme() }}>${c}
		</sl-button>`)}
	</sl-button-group>
</div>`
	}
}

@customElement("mode-contrast-panel")
class _panel extends LitElement {
	private themeProvider = new ThemeProvider(this)
	static override get styles() { return [Shared, StyleToggleBtn] }
	override render() {
		const theme = this.themeProvider.GetTheme()
		return html`
<div class="toggle-btn"
	>Panel Contrast
	<sl-button-group>
		${([0, 50, 100, 200] as const).map(c => html`
		<sl-button ?selected=${theme.ContrastPanel === c}
			@click=${() => { theme.ContrastPanel = c; this.themeProvider.ReapplyTheme() }}>${c}
		</sl-button>`)}
	</sl-button-group>
</div>`
	}
}

@customElement("mode-contrast-text")
class _text extends LitElement {
	private themeProvider = new ThemeProvider(this)
	static override get styles() { return [Shared, StyleToggleBtn] }
	override render() {
		const theme = this.themeProvider.GetTheme()
		return html`
<div class="toggle-btn"
	>Text Contrast
	<sl-button-group>
		${([800, 900, 950, 1000] as const).map(c => html`
		<sl-button ?selected=${theme.ContrastText === c}
			@click=${() => { theme.ContrastText = c; this.themeProvider.ReapplyTheme() }}>${c}
		</sl-button>`)}
	</sl-button-group>
</div>`
	}
}
