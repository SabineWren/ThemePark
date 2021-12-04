import { html, LitElement, TemplateResult } from "lit"
import { Shared } from "Elements/Style.js"

const CURRENCY = [
	{ File: "mandalorian-helmet", Label: "Beskar" },
	{ File: "caps", Label: "Caps" },
	{ File: "dogecoin-text", Label: "Doge" },
] as const
type currencyMeta = typeof CURRENCY[number]

let selected = CURRENCY[0]
export const FormatMoney = (n: number | null): TemplateResult => {
	if (n === null || n === undefined || isNaN(n)) { return html`` }
	if (!Number.isFinite(n)) { return html`∞` }
	const money = n.toLocaleString(
		"en", { maximumFractionDigits: 2, minimumFractionDigits: 2 })
	return html`${getIcon(selected)}${money}`
}

export class CurrencyPicker extends LitElement {
	static override get styles() { return [Shared] }
	override render() {
		return html`
<sl-dropdown>
	<sl-button slot="trigger" caret>
		${getIcon(selected)} 420
	</sl-button>
	<sl-menu
		@sl-select=${(e: any) => {
			selected = e.detail.item.currency
			this.requestUpdate()}}>
		${CURRENCY.map(o => html`
		<sl-menu-item ?checked=${o === selected} .currency="${o}">
			${getIcon(o)} ${o.Label}
		</sl-menu-item>`)}
	</sl-menu>
</sl-dropdown>`
	}
}

const getIcon = (c: currencyMeta) => html`
<sl-icon slot="prefix" library="custom-icons" name="${c.File}"></sl-icon>`
