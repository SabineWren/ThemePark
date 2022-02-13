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
		const isOutline = $<SlSwitch>(this, "sl-switch")?.checked ?? false
		return html`
<div style="display: flex;">
	<sl-button variant="default" href="https://shoelace.style/" target="_blank"
		>Shoelace
		<sl-icon slot="prefix" name="sl-logo" library="custom"></sl-icon>
	</sl-button>
	<sl-button variant="default" href="https://github.com/SabineWren/themepark.style" target="_blank"
		>Source
		<sl-icon slot="prefix" name="github"></sl-icon>
	</sl-button>
	<sl-tooltip placement="right"
		content="Not saved to theme. The app developer chooses when to outline buttons.">
		<sl-switch style="margin: auto; margin-left: 1rem;"
			@sl-change=${() => this.requestUpdate()}
			>Preview Outline
		</sl-switch>
	</sl-tooltip>
	<div style="flex-grow: 1;"></div>
	<theme-exporter></theme-exporter>
	<theme-picker-dropdown></theme-picker-dropdown>
	<theme-picker-switch></theme-picker-switch>
</div>

<div style="display: flex; gap: 2rem; margin: 1rem;">
	<mode-theme-type></mode-theme-type>
	<mode-contrast-body></mode-contrast-body>
	<mode-contrast-panel></mode-contrast-panel>
	<mode-contrast-text></mode-contrast-text>
</div>

<tab-colour-editor-group .IsOutline=${isOutline}></tab-colour-editor-group>

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
