import { css, html, LitElement} from "lit"
import { customElement } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"
import { ThemeProvider } from "Providers/Theme.js"

const style = css`
.toggle-btn {
	display: flex;
	flex-direction: column;
	align-items: flex-start; }`

@customElement("mode-contrast-body")
class _body extends LitElement {
	private themeProvider = new ThemeProvider(this)
	static override get styles() { return [Shared, style] }
	override render() {
		const theme = this.themeProvider.GetTheme()
		return html`
<div class="toggle-btn">
	Body Contrast
	<sl-button-group>
		${([0, 50, 100, 200] as const).map(c => html`
		<sl-button ?outline=${theme.ContrastBody === c}
			@click=${() => { theme.ContrastBody = c; this.themeProvider.ReapplyTheme() }}>${c}
		</sl-button>`)}
	</sl-button-group>
</div>`
	}
}

@customElement("mode-contrast-panel")
class _panel extends LitElement {
	private themeProvider = new ThemeProvider(this)
	static override get styles() { return [Shared, style] }
	override render() {
		const theme = this.themeProvider.GetTheme()
		return html`
<div class="toggle-btn">
	Panel Contrast
	<sl-button-group>
		${([0, 50, 100, 200] as const).map(c => html`
		<sl-button ?outline=${theme.ContrastPanel === c}
			@click=${() => { theme.ContrastPanel = c; this.themeProvider.ReapplyTheme() }}>${c}
		</sl-button>`)}
	</sl-button-group>
</div>`
	}
}

@customElement("mode-contrast-text")
class _text extends LitElement {
	private themeProvider = new ThemeProvider(this)
	static override get styles() { return [Shared, style] }
	override render() {
		const theme = this.themeProvider.GetTheme()
		return html`
<div class="toggle-btn">
	Text Contrast
	<sl-button-group>
		${([800, 900, 950, 1000] as const).map(c => html`
		<sl-button ?outline=${theme.ContrastText === c}
			@click=${() => { theme.ContrastText = c; this.themeProvider.ReapplyTheme() }}>${c}
		</sl-button>`)}
	</sl-button-group>
</div>`
	}
}
