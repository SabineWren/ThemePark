import { css, html, LitElement } from "lit"

export class AppRoot extends LitElement {
	static override get styles() {
		return [css`
:host {
	display: block;
	height: 100vw; width: 100%;
}`]
	}
	override render() {
		return html`
<div style="display: flex;">
	<div>TODO Logo</div>
	<div style="flex-grow: 1;"></div>
	<select-theme></select-theme>
</div>`
	}
}
