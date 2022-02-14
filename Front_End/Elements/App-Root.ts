import { css, html, LitElement } from "lit"
import { customElement } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"

const style = css`
:host {
	display: block;
	height: 100vw; width: 100%; }
.flex {
	display: flex; gap: 1rem; flex-wrap: wrap;
	margin: 1rem 0; justify-content: center; }
sl-card {
	flex: 0 0 25rem; }
`
@customElement("app-root")
export class AppRoot extends LitElement {
	static override get styles() { return [Shared, style] }
	override render() {
		return html`
<top-bar></top-bar>

<div style="display: flex; gap: 2rem; margin: 1rem;">
	<mode-theme-type></mode-theme-type>
	<mode-contrast-body></mode-contrast-body>
	<mode-contrast-panel></mode-contrast-panel>
	<mode-contrast-text></mode-contrast-text>
</div>

<tab-colour-editor-group></tab-colour-editor-group>

<div class="flex">
	<sl-card>
		<h4>Card: Decorative</h4>
		<p>Low-contrast background. Themes may decorate with gradients, transparency effects, etc. Themes should darken the centre to improve text contrast.</p>
	</sl-card>

	<sl-card>
		<h4>Card: Subtle</h4>
		<p>High-contrast background. May contain a stretched image. Themes may apply a box shadow, or style headers/icons with gradients.</p>
	</sl-card>

	<sl-card>
		<h4>Card: Outline</h4>
		<p>Similar to Subtle cards. However, this always has a border and never has a box shadow.</p>
	</sl-card>
</div>`
	}
}
