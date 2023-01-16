import { html, LitElement} from "lit"
import { customElement } from "lit/decorators.js"
import { Shared, StyleToggleBtn } from "Elements/Style.js"
import { ThemeProvider } from "Providers/Theme.js"

@customElement("mode-theme-type")
class _lightDark extends LitElement {
	private theme = new ThemeProvider(this)
	static override styles = [Shared, StyleToggleBtn]
	override render = () => html`
<div class="toggle-btn"
	>Theme Type
	<sl-button-group>
		<sl-button ?selected=${this.theme.GetIsLight()}
			@click=${() => this.theme.SetIsLight(true)}
			>Light
		</sl-button>
		<sl-button ?selected=${!this.theme.GetIsLight()}
			@click=${() => this.theme.SetIsLight(false)}
			>Dark
		</sl-button>
	</sl-button-group>
</div>`
}

@customElement("mode-contrast-body")
class _body extends LitElement {
	private theme = new ThemeProvider(this)
	static override styles = [Shared, StyleToggleBtn]
	override render = () => html`
<div class="toggle-btn"
	>Body Contrast
	<sl-button-group>
		${([0, 50, 100, 200] as const).map(c => html`
		<sl-button ?selected=${c === this.theme.GetContrastBody()}
			@click=${() => this.theme.SetContrastBody(c)}
			>${c}
		</sl-button>`)}
	</sl-button-group>
</div>`
}

@customElement("mode-contrast-panel")
class _panel extends LitElement {
	private theme = new ThemeProvider(this)
	static override styles = [Shared, StyleToggleBtn]
	override render() {
		return html`
<div class="toggle-btn"
	>Panel Contrast
	<sl-button-group>
		${([0, 50, 100] as const).map(c => html`
		<sl-button ?selected=${c === this.theme.GetContrastPanel()}
			@click=${() => this.theme.SetContrastPanel(c)}
			>${c}
		</sl-button>`)}
	</sl-button-group>
</div>`
	}
}

@customElement("mode-contrast-text")
class _text extends LitElement {
	private theme = new ThemeProvider(this)
	static override styles = [Shared, StyleToggleBtn]
	override render = () => html`
<div class="toggle-btn"
	>Text Contrast
	<sl-button-group>
		${([800, 900, 950, 1000] as const).map(c => html`
		<sl-button ?selected=${c === this.theme.GetContrastText()}
			@click=${() => this.theme.SetContrastText(c)}
			>${c}
		</sl-button>`)}
	</sl-button-group>
</div>`
}
