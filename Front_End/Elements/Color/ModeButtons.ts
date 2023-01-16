import { css, html, LitElement} from "lit"
import { customElement } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"
import { ThemeProvider } from "Providers/Theme.js"

@customElement("mode-theme-type")
class _lightDark extends LitElement {
	private theme = new ThemeProvider(this)
	static override styles = [Shared]
	override render = () => html`
<sl-radio-group
	label="Theme Type"
	value="${this.theme.GetIsLight() ? "light" : "dark"}"
	@sl-change=${(e: CustomEvent) => {
		const option = (e.currentTarget as SlRadioGroup).value as "light" | "dark"
		this.theme.SetIsLight(option === "light")
	}}>
	<sl-radio-button value="light">Light</sl-radio-button>
	<sl-radio-button value="dark">Dark</sl-radio-button>
</sl-radio-group>
`
}

@customElement("mode-contrast-body")
class _body extends LitElement {
	private theme = new ThemeProvider(this)
	static override styles = [Shared]
	override render = () => html`
<sl-radio-group
	label="Body Contrast"
	value="${this.theme.GetContrastBody()}"
	@sl-change=${(e: CustomEvent) => {
		const option = Number.parseInt((e.currentTarget as SlRadioGroup).value)
		this.theme.SetContrastBody(option as ThemeSpecification["ContrastBody"])
	}}>
	${[0, 50, 100, 200].map(r => html`<sl-radio-button value="${r}">${r}</sl-radio-button>`)}
</sl-radio-group>
`
}

@customElement("mode-contrast-panel")
class _panel extends LitElement {
	private theme = new ThemeProvider(this)
	static override styles = [Shared]
	override render() {
		return html`
<sl-radio-group
	label="Panel Contrast"
	value="${this.theme.GetContrastPanel()}"
	@sl-change=${(e: CustomEvent) => {
		const option = Number.parseInt((e.currentTarget as SlRadioGroup).value)
		this.theme.SetContrastPanel(option as ThemeSpecification["ContrastPanel"])
	}}>
	${[0, 50, 100].map(r => html`<sl-radio-button value="${r}">${r}</sl-radio-button>`)}
</sl-radio-group>
`
	}
}

@customElement("mode-contrast-text")
class _text extends LitElement {
	private theme = new ThemeProvider(this)
	static override styles = [Shared]
	override render = () => html`
<sl-radio-group
	label="Text Contrast"
	value="${this.theme.GetContrastText()}"
	@sl-change=${(e: CustomEvent) => {
		const option = Number.parseInt((e.currentTarget as SlRadioGroup).value)
		this.theme.SetContrastText(option as ThemeSpecification["ContrastText"])
	}}>
	${[800, 900, 950, 1000].map(r => html`<sl-radio-button value="${r}">${r}</sl-radio-button>`)}
</sl-radio-group>
`
}
