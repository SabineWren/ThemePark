import { html, LitElement } from "lit"
import { Shared } from "Elements/Style.js"
import { ThemeMode, ThemeProvider } from "Format/Theme.js"

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

export class ThemePickerSwitch extends LitElement {
	private theme = new ThemeProvider(this)
	static override get styles() { return [Shared] }
	override render() {
		const selected = this.theme.GetMode()
		return html`
<sl-dropdown>
	<sl-button slot="trigger" caret type="default">
		<sl-icon name="${selected === ThemeMode.Light ? "sun" : "moon"}"></sl-icon>
	</sl-button>
	<sl-menu @sl-select=${(e: any) => this.theme.SetMode(e.detail.item.modeValue)}>
		<sl-menu-item
			?checked=${selected === ThemeMode.Dark}
			.modeValue=${ThemeMode.Dark}
			>Dark
		</sl-menu-item>
		<sl-menu-item
			?checked=${selected === ThemeMode.Light}
			.modeValue=${ThemeMode.Light}
			>Light
		</sl-menu-item>
	</sl-menu>
</sl-dropdown>`
	}
}
