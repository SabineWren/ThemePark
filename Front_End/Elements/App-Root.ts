import { css, html, LitElement } from "lit"
import { customElement } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"

const style = css`
:host {
	height: 100vw; width: 100%;
	display: flex; flex-direction: column; gap: 1.5rem;
}
.centre {
	margin-left: auto; margin-right: auto; }
`
@customElement("app-root")
class _ele extends LitElement {
	static override get styles() { return [Shared, style] }
	override render() {
		return html`
<top-bar></top-bar>

<div class="centre" style="display: inline-flex; gap: 2rem;">
	<mode-theme-type></mode-theme-type>
	<mode-contrast-body></mode-contrast-body>
	<mode-contrast-panel></mode-contrast-panel>
	<mode-contrast-text></mode-contrast-text>
</div>

<tab-colour-editor-group class="centre"></tab-colour-editor-group>

<card-group class="centre"></card-group>
`
	}
}
