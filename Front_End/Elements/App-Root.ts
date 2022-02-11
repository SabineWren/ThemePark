import { css, html, LitElement } from "lit"
import { customElement } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"

@customElement("app-root")
export class AppRoot extends LitElement {
	static override get styles() { return [Shared, css`
:host {
	display: block;
	height: 100vw; width: 100%; }
.flex {
	display: flex; gap: 1rem; flex-wrap: wrap;
	margin: 1rem 0; justify-content: center; }
sl-card { flex: 0 0 25rem; }
`]
	}
	override render() {
		const isOutline = $<SlSwitch>(this, "sl-switch")?.checked ?? false
		const isColoursHidden = $<SlTab>(this, "#hide-colours")?.active ?? false
		const variants = ["primary", "success", "neutral", "warning", "danger"] as const
		return html`
<div style="display: flex;">
	<sl-button variant="default" href="https://github.com/SabineWren/Theme-Park" target="_blank">
		<sl-icon slot="prefix" name="github"></sl-icon>
		Source
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

<sl-tab-group style="margin: 0 auto; display: inline-block;"
	@sl-tab-show=${() => this.requestUpdate()}>
	${variants.map((t: ButtonVariant) => html`
	<sl-tab slot="nav" panel="${t}">
		<sl-button variant="${t}" ?outline=${isOutline}>
			${t[0].toUpperCase() + t.slice(1)}
			<sl-icon slot="suffix" name="palette"></sl-icon>
		</sl-button>
	</sl-tab>
	<sl-tab-panel name="${t}">
		<theme-editor variant="${t}"></theme-editor>
	</sl-tab-panel>`)}
	<sl-tab slot="nav" id="hide-colours">
		<sl-button variant="default" ?outline=${isOutline}
			>Collapse
			<sl-icon slot="suffix" name=${isColoursHidden ? "chevron-right" : "chevron-down"}></sl-icon>
		</sl-button>
	</sl-tab>
</sl-tab-group>

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
</div>
<div class="flex">
	<sl-button variant="default">Default</sl-button>
	<sl-button variant="primary">Primary</sl-button>
	<sl-button variant="success">Success</sl-button>
	<sl-button variant="neutral">Neutral</sl-button>
	<sl-button variant="warning">Warning</sl-button>
	<sl-button variant="danger">Danger</sl-button>
</div>
<div class="flex">
	<sl-button variant="default" outline>Default</sl-button>
	<sl-button variant="primary" outline>Primary</sl-button>
	<sl-button variant="success" outline>Success</sl-button>
	<sl-button variant="neutral" outline>Neutral</sl-button>
	<sl-button variant="warning" outline>Warning</sl-button>
	<sl-button variant="danger" outline>Danger</sl-button>
</div>
`
	}
}
