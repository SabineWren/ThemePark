import { html, LitElement } from "lit"
import { customElement } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"
import { CurrencyFormatter, CURRENCIES, CurrencyToIcon } from "Providers/Currency.js"

@customElement("currency-picker")
export class CurrencyPicker extends LitElement {
	private currency = new CurrencyFormatter(this)
	static override get styles() { return [Shared] }
	override render() {
		return html`
<sl-dropdown>
	<sl-button slot="trigger" caret>
		${this.currency.ToHtml(420)}
	</sl-button>
	<sl-menu
		@sl-select=${(e: any) => this.currency.Set(e.detail.item.currency)}>
		${CURRENCIES.map(o => html`
		<sl-menu-item ?checked=${o === this.currency.Get()} .currency="${o}">
			${CurrencyToIcon(o)} ${o.Label}
		</sl-menu-item>`)}
	</sl-menu>
</sl-dropdown>`
	}
}
