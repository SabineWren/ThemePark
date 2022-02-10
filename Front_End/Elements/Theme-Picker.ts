import { css, html, LitElement } from "lit"
import { customElement } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"
import { ThemeMode, ThemeProvider } from "Providers/Theme.js"

@customElement("theme-picker-dropdown")
export class ThemePickerDropdown extends LitElement {
	private theme = new ThemeProvider(this)
	static override get styles() { return [Shared] }
	override render() {
		const selected = this.theme.GetTheme()
		return html`
<sl-dropdown>
	<sl-button slot="trigger" caret>${selected.Label}</sl-button>
	<sl-menu
		@sl-select=${(e: any) => this.theme.SetTheme(e.detail.item.theme)}>
		${this.theme.GetThemeOptions().map(o => html`
		<sl-menu-item ?checked=${o === selected} .theme="${o}"
			>${o.Label}
		</sl-menu-item>`)}
	</sl-menu>
</sl-dropdown>`
	}
}

@customElement("theme-picker-switch")
export class ThemePickerSwitch extends LitElement {
	private theme = new ThemeProvider(this)
	static override get styles() { return [
		Shared, css`:host { display: flex; }`] }
	override render() {
		const selected = this.theme.GetMode()
		const getType = (m: ThemeMode) => m === selected ? "primary" : "default"
		return html`
<sl-button type=${getType(ThemeMode.Light)}
	?outline=${selected === ThemeMode.Light}
	@click=${() => this.theme.SetMode(ThemeMode.Light)}
	><sl-icon name="sun"></sl-icon>
</sl-button>
<sl-button type=${getType(ThemeMode.Dark)}
	?outline=${selected === ThemeMode.Dark}
	@click=${() => this.theme.SetMode(ThemeMode.Dark)}
	><sl-icon name="moon"></sl-icon>
</sl-button>`
	}
}
