import { css, html, LitElement } from "lit"
import { customElement } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"

const renderColourPicker = (t: SemanticColour) => html`
<sl-tab slot="nav" panel="${t}">
	<sl-button type="${t}">
		${t[0].toUpperCase() + t.slice(1)}
		<sl-icon slot="suffix" name="palette"></sl-icon>
	</sl-button>
</sl-tab>
<sl-tab-panel name="${t}">
	<theme-editor variant="${t}"></theme-editor>
</sl-tab-panel>`

@customElement("app-root")
export class AppRoot extends LitElement {
	static override get styles() { return [Shared, css`
:host {
	display: block;
	height: 100vw; width: 100%;
}
.flex {
	display: flex; gap: 1rem; flex-wrap: wrap;
	margin: 1rem 0; justify-content: center; }
sl-card { flex: 0 0 25rem; }
`]
	}
	override render() {
		const variants = ["primary", "success", "neutral", "warning", "danger"] as const
		return html`
<div style="display: flex;">
	<div style="height: var(--sl-input-height-medium);">
		<img style="height: 100%; padding: 0.4rem;" src="/images/logo.svg"/>
	</div>
	<div style="margin: auto 0; font-weight: 600;">Theme Park</div>
	<div style="flex-grow: 1;"></div>
	<theme-picker-dropdown></theme-picker-dropdown>
	<theme-picker-switch></theme-picker-switch>
</div>
<sl-tab-group>
	${variants.map(c => renderColourPicker(c))}
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
	<sl-button type="default">Default</sl-button>
	<sl-button type="primary">Primary</sl-button>
	<sl-button type="success">Success</sl-button>
	<sl-button type="neutral">Neutral</sl-button>
	<sl-button type="warning">Warning</sl-button>
	<sl-button type="danger">Danger</sl-button>
</div>
<div class="flex">
	<sl-button type="default" outline>Default</sl-button>
	<sl-button type="primary" outline>Primary</sl-button>
	<sl-button type="success" outline>Success</sl-button>
	<sl-button type="neutral" outline>Neutral</sl-button>
	<sl-button type="warning" outline>Warning</sl-button>
	<sl-button type="danger" outline>Danger</sl-button>
</div>
`
	}
}
