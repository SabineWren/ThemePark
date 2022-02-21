import { css, html, LitElement } from "lit"
import { customElement } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"

@customElement("menu-header")
class _class extends LitElement {
	static override get styles() { return [Shared, css`
:host { display: block; user-select: none; }
sl-menu-label {
	position: relative;
	display: flex; justify-content: center;
	font-weight: 600; }
.line {
	position: absolute; top: 50%; left: 1em;
	height: 2px; width: Calc(100% - 2em);
	background: currentColor; }
.frame {
	position: relative;
	display: inline-block;
	padding: 0 1em;
	background-color: var(--sl-panel-background-color); }
`] }
	override render = () => html`
<sl-menu-label>
	<div class="line"></div>
	<div class="frame"><slot></slot></div>
</sl-menu-label>`
}
