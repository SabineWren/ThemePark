import { css, html, LitElement } from "lit"
import { Shared } from "Elements/Style.js"
import { ThemeMode, ThemeProvider } from "Format/Theme.js"

export class ThemePickerDropdown extends LitElement {
	private theme = new ThemeProvider(this)
	static override get styles() { return [Shared] }
	override render() {
		const selected = this.theme.GetTheme()
		return html`
<sl-dropdown>
	<sl-button slot="trigger" caret>${selected.Spec.Label}</sl-button>
	<sl-menu
		@sl-select=${(e: any) => this.theme.SetTheme(e.detail.item.theme)}>
		${this.theme.GetThemeOptions().map(o => html`
		<sl-menu-item ?checked=${o === selected} .theme="${o}"
			>${o.Spec.Label}
		</sl-menu-item>`)}
	</sl-menu>
</sl-dropdown>`
	}
}

export class ThemePickerSwitch extends LitElement {
	private theme = new ThemeProvider(this)
	static override get styles() { return [
		Shared, css`:host { display: flex; }`] }
	override render() {
		const selected = this.theme.GetMode()
		const getType = (m: ThemeMode) => m === selected ? "primary" : "default"
		return html`
<sl-button ?outline=${selected === ThemeMode.Light}
	type=${getType(ThemeMode.Light)}
	@click=${() => this.theme.SetMode(ThemeMode.Light)}
	><sl-icon name="sun"></sl-icon>
</sl-button>
<sl-button ?outline=${selected === ThemeMode.Dark}
	type=${getType(ThemeMode.Dark)}
	@click=${() => this.theme.SetMode(ThemeMode.Dark)}
	><sl-icon name="moon"></sl-icon>
</sl-button>`
	}
}
