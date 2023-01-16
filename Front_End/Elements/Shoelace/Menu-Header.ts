import { css, html, LitElement } from "lit"
import { customElement } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"

const style = css`
:host {
	display: block;
	font-weight: 600;
	white-space: nowrap;
	--min-line-width: Calc(var(--sl-spacing-x-large) - 2 * var(--sl-spacing-x-small));
}
sl-menu-label::part(base) {
	display: flex; gap: var(--sl-spacing-x-small); align-items: center;
	padding-left: var(--sl-spacing-x-small);
	background: var(--sl-panel-background-color);
}
.line { height: 2px; width: var(--min-line-width); background: currentColor; }
.left { flex: 0 0 var(--min-line-width); }
.right { flex: 1 0 var(--min-line-width); }
`

@customElement("ui-menu-header")
class _class extends LitElement {
	static override styles = [Shared, style]
	override render = () => html`
<sl-menu-label>
	<div class="line left"></div>
	<div><slot></slot></div>
	<div class="line right"></div>
</sl-menu-label>`
}

