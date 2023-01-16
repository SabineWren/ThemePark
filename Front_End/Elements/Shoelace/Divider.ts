import { css, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"
import componentStyles from "./internal/component.styles.js"
import { watch } from "./internal/watch.js"

/**
 * @cssproperty --color - The color or CSS gradient of the divider.
 * @cssproperty --width - The width of the divider.
 * @cssproperty --spacing - The spacing of the divider.
 */
const style = css`
${componentStyles}

:host {
	--width: var(--sl-panel-border-width);
	--spacing: var(--sl-spacing-medium);
	background: var(--color, var(--sl-panel-border-color));
}
:host(:not([vertical])) {
	display: block;
	height: var(--width);
	margin: var(--spacing) 0;
}
:host([vertical]) {
	display: inline-block; height: 100%;
	width: var(--width);
	margin: 0 var(--spacing);
}
`

@customElement('sl-divider')
class _class extends LitElement {
	static override styles = [style]
	@property({ type: Boolean, reflect: true }) vertical = false

	override connectedCallback() {
		super.connectedCallback()
		this.setAttribute('role', 'separator')
	}

	@watch('vertical')
	handleVerticalChange() {
		this.setAttribute('aria-orientation', this.vertical ? 'vertical' : 'horizontal')
	}
}
