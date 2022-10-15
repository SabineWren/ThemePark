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

<sl-divider
	style="
	--width: 2px;
	--start: 52, 86%, 54%;
	--end: 9, 100%, 67%;
	--color: linear-gradient(135deg
		,hsla(var(--end), 0%) 0%
		,hsla(var(--end), 40%) 19%
		,hsla(var(--start), 100%) 29%
		,hsla(var(--start), 70%) 35%
		,hsla(var(--end), 50%) 45%
		,hsla(var(--end), 15%) 70%
		,hsla(var(--end), 0%) 100%
	);">
</sl-divider>

<card-group class="centre"></card-group>
`
	}
}
