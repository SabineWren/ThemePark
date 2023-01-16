import { html, LitElement } from "lit"
import { customElement } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"
import { ThemeProvider } from "Providers/Theme.js"

const AURORA = [
	[`Drazi Dark`, `url("/aurora/aurora-corners.svg")`],
] as const
const OPEN_PROPS = [
	[`Open Props 1`, `var(--gradient-1)`],
] as const
type option = typeof AURORA[number] | typeof OPEN_PROPS[number]

@customElement("select-gradient")
class _class extends LitElement {
	private themeProvider = new ThemeProvider(this)
	private selected: option = AURORA[0]
	private handleSelect(e: any) {
		const option: option = e.detail.item.Option
		if (option === this.selected) { return }
		this.selected = option
		this.themeProvider.SetGradient(option[1])
	}
	static override styles = [Shared]
	override render() {
		const toMenuItem = (o: option) => html`
<sl-menu-item ?checked=${o === this.selected}
	.Option=${o}
	>${o[0]}
</sl-menu-item>`
		return html`
<sl-dropdown
	@sl-select=${(e: any) => this.handleSelect(e)}>
	<sl-button variant="default" size="medium" slot="trigger"
		>${this.selected[0]}
		<sl-icon slot="suffix" name="caret-down-fill"></sl-icon>
	</sl-button>
	<sl-menu>
		<ui-menu-header>Aurora</ui-menu-header>
		${AURORA.map(toMenuItem)}
		<ui-menu-header>Open Props</ui-menu-header>
		${OPEN_PROPS.map(toMenuItem)}
	</sl-menu>
</sl-dropdown>`
	}
}
