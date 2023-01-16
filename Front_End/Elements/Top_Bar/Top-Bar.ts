import { css, html, LitElement } from "lit"
import { customElement } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"
import { PreviewState } from "Providers/PreviewState.js"


@customElement("top-bar")
class _ele extends LitElement {
	private previewState = new PreviewState(this)
	static override styles = [Shared, css`:host { display: flex; }`]
	override render() {
		return html`
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
		.checked=${this.previewState.GetIsOutline()}
		@sl-change=${(e: Event) => this.previewState
			.SetIsOutline((e.currentTarget as SlSwitch).checked)}
		>Preview Outline
	</sl-switch>
</sl-tooltip>
<div style="flex-grow: 1;"></div>
<theme-exporter></theme-exporter>
<theme-picker-dropdown></theme-picker-dropdown>
<theme-picker-switch></theme-picker-switch>
`
	}
}
