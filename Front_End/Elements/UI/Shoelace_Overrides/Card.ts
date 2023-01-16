import { classMap } from 'lit/directives/class-map.js'
import { customElement, property } from "lit/decorators.js"
import { HasSlotController } from '@shoelace-style/shoelace/dist/internal/slot'
import { css, html } from "lit"
import ShoelaceElement from '@shoelace-style/shoelace/dist/internal/shoelace-element'
import componentStyles from "@shoelace-style/shoelace/dist/styles/component.styles.js"

const style = css`
	${componentStyles}

	:host {
		--border-color: var(--sl-color-neutral-200);
		--border-radius: var(--sl-border-radius-medium);
		--border-width: 1px;
		--padding: var(--sl-spacing-large);
		display: inline-block;
	}
	.card {
		display: flex;
		flex-direction: column;
		background-color: var(--sl-panel-background-color);
		box-shadow: var(--sl-shadow-x-small);
		border: solid var(--border-width) var(--border-color);
		border-radius: var(--border-radius);
	}
	.card__image {
		display: flex;
		border-top-left-radius: var(--border-radius);
		border-top-right-radius: var(--border-radius);
		margin: calc(-1 * var(--border-width));
		overflow: hidden;
	}
	.card__image::slotted(img) {
		display: block;
		width: 100%;
	}
	.card:not(.card--has-image) .card__image {
		display: none;
	}
	.card__header {
		display: block;
		border-bottom: solid var(--border-width) var(--border-color);
		padding: calc(var(--padding) / 2) var(--padding);
	}
	.card:not(.card--has-header) .card__header {
		display: none;
	}
	.card:not(.card--has-image) .card__header {
		border-top-left-radius: var(--border-radius);
		border-top-right-radius: var(--border-radius);
	}
	.card__body {
		display: block;
		padding: var(--padding);
	}
	.card--has-footer .card__footer {
		display: block;
		border-top: solid var(--border-width) var(--border-color);
		padding: var(--padding);
	}
	.card:not(.card--has-footer) .card__footer {
		display: none;
	}
`

const variants = css`
:host([variant="outline"]) {
	height: fit-content;
	border-radius: var(--border-radius);
	padding: var(--sl-spacing-2x-small);
	background: var(--gradient-1);
}
:host([variant="outline"]) .card {
	border: none;
}

:host([variant="decorative"]) {
	--icon-fill: currentColor;
	background: var(--card-decorative-bg);
}
:host([variant="decorative"]) .card__header {
	border: none;
}
:host([variant="decorative"]) .card {
	color: var(--sl-color-neutral-1000);
	background: transparent;
	backdrop-filter: blur(5px);
	border: none;
}
`

/**
 * @summary Cards can be used to group related subjects in a container.
 * @documentation https://shoelace.style/components/card
 * @status stable
 * @since 2.0
 *
 * @slot - The card's main content.
 * @slot header - An optional header for the card.
 * @slot footer - An optional footer for the card.
 * @slot image - An optional image to render at the start of the card.
 *
 * @csspart base - The component's base wrapper.
 * @csspart image - The container that wraps the card's image.
 * @csspart header - The container that wraps the card's header.
 * @csspart body - The container that wraps the card's main content.
 * @csspart footer - The container that wraps the card's footer.
 *
 * @cssproperty --border-color - The card's border color, including borders that occur inside the card.
 * @cssproperty --border-radius - The border radius for the card's edges.
 * @cssproperty --border-width - The width of the card's borders.
 * @cssproperty --padding - The padding to use for the card's sections.
 */
@customElement('sl-card')
export default class SlCard extends ShoelaceElement {
	static override styles = [style, variants]
	@property({ reflect: true }) variant: 'subtle' | 'outline' | 'decorative' = 'subtle'

	private readonly hasSlotController = new HasSlotController(this, 'footer', 'header', 'image')

	override render = () => {
		return html`
			<div
				part="base"
				class=${classMap({
					card: true,
					'card--has-footer': this.hasSlotController.test('footer'),
					'card--has-image': this.hasSlotController.test('image'),
					'card--has-header': this.hasSlotController.test('header')
				})}
			>
				<slot name="image" part="image" class="card__image"></slot>
				<slot name="header" part="header" class="card__header"></slot>
				<slot part="body" class="card__body"></slot>
				<slot name="footer" part="footer" class="card__footer"></slot>
			</div>
		`
	}
}
