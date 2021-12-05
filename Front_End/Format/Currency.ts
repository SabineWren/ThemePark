import { html, ReactiveController, ReactiveControllerHost } from "lit"

export const CURRENCIES = [
	{ File: "mandalorian-helmet", Label: "Beskar" },
	{ File: "caps", Label: "Caps" },
	{ File: "dogecoin-text", Label: "Doge" },
] as const
type optionCurrency = typeof CURRENCIES[number]

let hosts: ReactiveControllerHost[] = []
let selected: optionCurrency = CURRENCIES[0]
export const GetCurrency = () => selected

export class CurrencyFormat implements ReactiveController {
	constructor(private host: ReactiveControllerHost) {
		host.addController(this) }
	hostConnected() {
		hosts.push(this.host) }
	hostDisconnected() {
		hosts = hosts.filter(h => h !== this.host) }
	Set(o: optionCurrency) {
		selected = o
		hosts.forEach(h => h.requestUpdate()) }
	ToHtml(n: number | null) {
		return [CurrencyToIcon(selected), toString(n)] }
	ToIcon() {
		return CurrencyToIcon(selected) }
}

export const CurrencyToIcon = (c: optionCurrency) => html`
<sl-icon library="custom-icons"
	name="${c.File}"
	slot="prefix"
></sl-icon>`

const toString = (n: number | null) => {
	if (n === null || n === undefined || isNaN(n)) { return html`` }
	if (!Number.isFinite(n)) { return html`∞` }
	return n.toLocaleString("en",
		{ maximumFractionDigits: 2, minimumFractionDigits: 2 })
}
