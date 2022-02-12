import { css, html, LitElement} from "lit"
import { customElement, property } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"


const style = css`
:host { display: inline-block; }

sl-tab-group::part(nav) {
	display: flex; }
sl-tab::part(base) {
	padding: var(--sl-spacing-medium); }

sl-card {
	margin: 0 auto; }
sl-card::part(base) {
	--padding: 1.5rem;
	box-shadow: var(--sl-shadow-large); }
sl-card::part(body) {
	display: flex; flex-direction: column; gap: 1.5rem; }
`

const variants = ["primary", "success", "neutral", "warning", "danger"] as const

@customElement("tab-colour-editor-group")
class _ele extends LitElement {
	@property({ attribute: false }) IsOutline = false
	private variant: keyof ThemeColours = "primary"
	static override get styles() { return [Shared, style] }
	override render() {
		const isColoursHidden = $<SlTab>(this, "#hide-colours")?.active ?? false
		return html`
<sl-tab-group style="margin: 0 auto; display: inline-block;"
	@sl-tab-show=${() => this.requestUpdate()}
	@sl-tab-hide=${() => this.requestUpdate()}>
	${variants.map(t => html`
	<sl-tab slot="nav" panel="${t}">
		<sl-button variant="${t}" ?outline=${this.IsOutline}>
			${t[0].toUpperCase() + t.slice(1)}
			<sl-icon slot="suffix" name="palette"></sl-icon>
		</sl-button>
	</sl-tab>
	<sl-tab-panel name="${t}">
		<sl-card>
			<tab-colour-editor variant="${t}"></tab-colour-editor>
		</sl-card>
	</sl-tab-panel>`)}
	<sl-tab slot="nav" id="hide-colours">
		<sl-button variant="default" ?outline=${this.IsOutline}
			>Collapse
			<sl-icon slot="suffix" name=${isColoursHidden ? "chevron-right" : "chevron-down"}></sl-icon>
		</sl-button>
	</sl-tab>
</sl-tab-group>
`
	}
}
