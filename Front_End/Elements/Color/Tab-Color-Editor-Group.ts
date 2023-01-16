import { css, html, LitElement} from "lit"
import { customElement } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"
import { PreviewState } from "Providers/PreviewState.js"


const style = css`
:host { display: inline-block; }

sl-tab-group::part(nav) {
	display: flex; justify-content: center; }

sl-tab::part(base) {
	padding: var(--sl-spacing-medium);
	padding-top: 0; }
sl-tab-panel::part(base) {
	padding-bottom: 0; }

sl-card {
	margin: 0 auto; }
sl-card::part(base) {
	--padding: 1.5rem;
	box-shadow: var(--sl-shadow-large); }
sl-card::part(body) {
	display: flex; flex-direction: column; gap: 1.5rem; }
`

const variants = ["primary", "success", "neutral", "warning", "danger"] as const

@customElement("tab-color-editor-group")
class _ele extends LitElement {
	private previewState = new PreviewState(this)
	private lastVariant: typeof variants[number] = variants[0]
	private setLast = (e: CustomEvent) => {
		if (variants.includes(e.detail.name)) {
			this.lastVariant = e.detail.name }
		this.requestUpdate()
	}
	static override styles = [Shared, style]
	override render() {
		const isOutline = this.previewState.GetIsOutline()
		const isCollapsed = $<SlTab>(this, "#hide-colors")?.active ?? false

		// Timeout so sl-tab events settle and update isCollapsed
		const reExpand = () => setTimeout(() => {
			if (!isCollapsed) { return }
			$<SlTabGroup>(this, "sl-tab-group").show(this.lastVariant)
		}, 0)

		return html`
<sl-tab-group style="margin: 0 auto; display: inline-block;"
	@sl-tab-hide=${(e: CustomEvent) => this.setLast(e)}>
	${variants.map(t => html`
	<sl-tab slot="nav" panel="${t}">
		<sl-button variant="${t}" ?outline=${isOutline}>
			${t[0].toUpperCase() + t.slice(1)}
			<sl-icon slot="suffix" name="palette"></sl-icon>
		</sl-button>
	</sl-tab>
	<sl-tab-panel name="${t}">
		<sl-card>
			<tab-color-editor variant="${t}"></tab-color-editor>
		</sl-card>
	</sl-tab-panel>`)}
	<sl-tab slot="nav" id="hide-colors">
		<sl-button variant="default" ?outline=${isOutline}
			@click=${() => reExpand()}>
			<div style="min-width: 4em;">${isCollapsed ? "Expand" : "Collapse"}</div>
			<sl-icon slot="suffix" name=${isCollapsed ? "chevron-right" : "chevron-down"}></sl-icon>
		</sl-button>
	</sl-tab>
</sl-tab-group>
`
	}
}
