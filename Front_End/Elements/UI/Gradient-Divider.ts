import { css, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"

/**
 * @cssproperty --color - The color or CSS gradient of the divider.
 * @cssproperty --width - The width of the divider.
 * @cssproperty --spacing - The spacing of the divider.
 */
const style = css`
:host {
	background: var(--color, var(--sl-panel-border-color));
	--width: var(--sl-panel-border-width);
	--spacing: var(--sl-spacing-medium);
	flex: 0 0 unset;
}
:host(:not([vertical])) {
	display: block;
	height: var(--width); width: 100%;
	margin: var(--spacing) 0;
}
:host([vertical]) {
	display: inline-block;
	height: 100%; width: var(--width);
	margin: 0 var(--spacing);
}
`

@customElement("sl-divider")
class _class extends LitElement {
	@property({ type: Boolean, reflect: true }) vertical = false
	static override get styles() { return [Shared, style] }
}
