import { html, LitElement } from "lit"
import { Shared } from "Elements/Style.js"
import { CurrencyFormat, CURRENCIES, CurrencyToIcon, GetCurrency } from "Format/Currency.js"

export class CurrencyPicker extends LitElement {
	private format = new CurrencyFormat(this)
	static override get styles() { return [Shared] }
	override render() {
		return html`
<sl-dropdown>
	<sl-button slot="trigger" caret>
		${this.format.ToHtml(420)}
	</sl-button>
	<sl-menu
		@sl-select=${(e: any) => this.format.Set(e.detail.item.currency)}>
		${CURRENCIES.map(o => html`
		<sl-menu-item ?checked=${o === GetCurrency()} .currency="${o}">
			${CurrencyToIcon(o)} ${o.Label}
		</sl-menu-item>`)}
	</sl-menu>
</sl-dropdown>`
	}
}
