import { css, html, LitElement } from "lit"
import { Shared } from "Elements/Style.js"

export class AppRoot extends LitElement {
	static override get styles() { return [Shared, css`
:host {
	display: block;
	height: 100vw; width: 100%;
}
#card-container {
	display: flex; gap: 1rem; flex-wrap: wrap;
	margin: 1rem 0; }
sl-card { flex: 0 0 25rem; }
`]
	}
	override render() {
		return html`
<div style="display: flex;">
	<div>TODO Logo</div>
	<div style="flex-grow: 1;"></div>
	<theme-picker></theme-picker>
</div>
<div id="card-container">
	<sl-card>
		<h4>Card: Decorative</h4>
		<p>Low-contrast background. Themes may decorate with gradients, transparency effects, etc. Themes should darken the centre to improve text contrast.</p>
	</sl-card>

	<sl-card>
		<h4>Card: Subtle</h4>
		<p>High-contrast background for related information. Suitable for image backgrounds. Themes may apply a box shadow, or style headers/icons with gradients.</p>
	</sl-card>

	<sl-card>
		<h4>Card: Outline</h4>
		<p>Similar to Subtle cards. However, this always has a border and never has a box shadow.</p>
	</sl-card>
</div>
`
	}
}
