import { classMap } from 'lit/directives/class-map.js'
import { customElement, property, query, state } from 'lit/decorators.js'
import { HasSlotController } from './internal/slot.js'
import { css } from "lit"
import { html } from 'lit/static-html.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { watch } from "./internal/watch.js"
import componentStyles from "./internal/component.styles.js"
import ShoelaceElement from './internal/shoelace-element.js'
import type { CSSResultGroup } from 'lit'

const buttonStyles = css`
	${componentStyles}
	:host {
		display: inline-block;
		position: relative;
		width: auto;
		cursor: pointer;
	}
	.button {
		display: inline-flex;
		align-items: stretch;
		justify-content: center;
		width: 100%;
		border-style: solid;
		border-width: var(--sl-input-border-width);
		font-family: var(--sl-input-font-family);
		font-weight: var(--sl-font-weight-semibold);
		text-decoration: none;
		user-select: none;
		white-space: nowrap;
		vertical-align: middle;
		padding: 0;
		transition: var(--sl-transition-x-fast) background-color, var(--sl-transition-x-fast) color,
			var(--sl-transition-x-fast) border, var(--sl-transition-x-fast) box-shadow;
		cursor: inherit;
	}
	.button::-moz-focus-inner {
		border: 0;
	}
	.button:focus {
		outline: none;
	}
	.button:focus-visible {
		outline: var(--sl-focus-ring);
		outline-offset: var(--sl-focus-ring-offset);
	}
	.button--disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	/* When disabled, prevent mouse events from bubbling up */
	.button--disabled * {
		pointer-events: none;
	}
	.button__prefix,
	.button__suffix {
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		pointer-events: none;
	}
	.button__label {
		display: inline-block;
	}
	.button__label::slotted(sl-icon) {
		vertical-align: -2px;
	}
	/*
	 * Standard buttons
	 */
	/* Default */
	.button--default {
		background-color: var(--sl-color-neutral-0);
		border-color: var(--sl-color-neutral-300);
		color: var(--sl-color-neutral-700);
	}
	.button--default:hover:not(.button--disabled) {
		background-color: var(--sl-color-primary-50);
		border-color: var(--sl-color-primary-300);
		color: var(--sl-color-primary-700);
	}
	.button--default:active:not(.button--disabled) {
		background-color: var(--sl-color-primary-100);
		border-color: var(--sl-color-primary-400);
		color: var(--sl-color-primary-700);
	}
	.button--default.button--checked {
		border-color: var(--sl-color-primary-200);
		box-shadow: 0 0 10px 4px var(--sl-color-primary-100) inset;
	}
	.button--default.button--checked:hover {
		border-color: var(--sl-color-primary-300);
		box-shadow: 0 0 10px 6px var(--sl-color-primary-100) inset;
	}
	/*
	 * Text buttons
	 */
	.button--text {
		background-color: transparent;
		border-color: transparent;
		color: var(--sl-color-primary-600);
	}
	.button--text:hover:not(.button--disabled) {
		background-color: transparent;
		border-color: transparent;
		color: var(--sl-color-primary-500);
	}
	.button--text:focus-visible:not(.button--disabled) {
		background-color: transparent;
		border-color: transparent;
		color: var(--sl-color-primary-500);
	}
	.button--text:active:not(.button--disabled) {
		background-color: transparent;
		border-color: transparent;
		color: var(--sl-color-primary-700);
	}
	/*
	 * Size modifiers
	 */
	.button--small {
		font-size: var(--sl-button-font-size-small);
		height: var(--sl-input-height-small);
		line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
		border-radius: var(--sl-input-border-radius-small);
	}
	.button--medium {
		font-size: var(--sl-button-font-size-medium);
		height: var(--sl-input-height-medium);
		line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
		border-radius: var(--sl-input-border-radius-medium);
	}
	.button--large {
		font-size: var(--sl-button-font-size-large);
		height: var(--sl-input-height-large);
		line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
		border-radius: var(--sl-input-border-radius-large);
	}
	/*
	 * Pill modifier
	 */
	.button--pill.button--small {
		border-radius: var(--sl-input-height-small);
	}
	.button--pill.button--medium {
		border-radius: var(--sl-input-height-medium);
	}
	.button--pill.button--large {
		border-radius: var(--sl-input-height-large);
	}
	/*
	 * Circle modifier
	 */
	.button--circle {
		padding-left: 0;
		padding-right: 0;
	}
	.button--circle.button--small {
		width: var(--sl-input-height-small);
		border-radius: 50%;
	}
	.button--circle.button--medium {
		width: var(--sl-input-height-medium);
		border-radius: 50%;
	}
	.button--circle.button--large {
		width: var(--sl-input-height-large);
		border-radius: 50%;
	}
	.button--circle .button__prefix,
	.button--circle .button__suffix {
		display: none;
	}
	/*
	 * Badges
	 */
	.button ::slotted(sl-badge) {
		position: absolute;
		top: 0;
		right: 0;
		translate: 50% -50%;
		pointer-events: none;
	}
	.button--rtl ::slotted(sl-badge) {
		right: auto;
		left: 0;
		translate: -50% -50%;
	}
	/*
	 * Button spacing
	 */
	.button--has-label.button--small .button__label {
		padding: 0 var(--sl-spacing-small);
	}
	.button--has-label.button--medium .button__label {
		padding: 0 var(--sl-spacing-medium);
	}
	.button--has-label.button--large .button__label {
		padding: 0 var(--sl-spacing-large);
	}
	.button--has-prefix.button--small {
		padding-inline-start: var(--sl-spacing-x-small);
	}
	.button--has-prefix.button--small .button__label {
		padding-inline-start: var(--sl-spacing-x-small);
	}
	.button--has-prefix.button--medium {
		padding-inline-start: var(--sl-spacing-small);
	}
	.button--has-prefix.button--medium .button__label {
		padding-inline-start: var(--sl-spacing-small);
	}
	.button--has-prefix.button--large {
		padding-inline-start: var(--sl-spacing-small);
	}
	.button--has-prefix.button--large .button__label {
		padding-inline-start: var(--sl-spacing-small);
	}
	.button--has-suffix.button--small {
		padding-inline-end: var(--sl-spacing-x-small);
	}
	.button--has-suffix.button--small .button__label {
		padding-inline-end: var(--sl-spacing-x-small);
	}
	.button--has-suffix.button--medium {
		padding-inline-end: var(--sl-spacing-small);
	}
	.button--has-suffix.button--medium .button__label {
		padding-inline-end: var(--sl-spacing-small);
	}
	.button--has-suffix.button--large{
		padding-inline-end: var(--sl-spacing-small);
	}
	.button--has-suffix.button--large .button__label {
		padding-inline-end: var(--sl-spacing-small);
	}
	/*
	 * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
	 * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
	 * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
	 * buttons and we style them here instead.
	 */
	:host(.sl-button-group__button--first:not(.sl-button-group__button--last)) .button {
		border-start-end-radius: 0;
		border-end-end-radius: 0;
	}
	:host(.sl-button-group__button--inner) .button {
		border-radius: 0;
	}
	:host(.sl-button-group__button--last:not(.sl-button-group__button--first)) .button {
		border-start-start-radius: 0;
		border-end-start-radius: 0;
	}
	/* All except the first */
	:host(.sl-button-group__button:not(.sl-button-group__button--first)) {
		margin-inline-start: calc(-1 * var(--sl-input-border-width));
	}
	/* Add a visual separator between solid buttons */
	:host(
			.sl-button-group__button:not(
					.sl-button-group__button--first,
					.sl-button-group__button--radio,
					[variant='default']
				):not(:hover)
		)
		.button:after {
		content: '';
		position: absolute;
		top: 0;
		inset-inline-start: 0;
		bottom: 0;
		border-left: solid 1px rgb(128 128 128 / 33%);
		mix-blend-mode: multiply;
	}
	/* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
	:host(.sl-button-group__button--hover) {
		z-index: 1;
	}
	/* Focus and checked are always on top */
	:host(.sl-button-group__button--focus),
	:host(.sl-button-group__button[checked]) {
		z-index: 2;
	}
`

const styles = css`
	${buttonStyles}
	.button__prefix,
	.button__suffix,
	.button__label {
		display: inline-flex;
		position: relative;
		align-items: center;
	}
	/* We use a hidden input so constraint validation errors work, since they don't appear to show when used with buttons.
		We can't actually hide it, though, otherwise the messages will be suppressed by the browser. */
	.hidden-input {
		all: unset;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		outline: dotted 1px red;
		opacity: 0;
		z-index: -1;
	}
`

/**
 * @summary Radios buttons allow the user to select a single option from a group using a button-like control.
 * @documentation https://shoelace.style/components/radio-button
 * @status stable
 * @since 2.0
 *
 * @slot - The radio button's label.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot suffix - A presentational suffix icon or similar element.
 *
 * @event sl-blur - Emitted when the button loses focus.
 * @event sl-focus - Emitted when the button gains focus.
 *
 * @csspart base - The component's base wrapper.
 * @csspart button - The internal `<button>` element.
 * @csspart button--checked - The internal button element when the radio button is checked.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart label - The container that wraps the radio button's label.
 * @csspart suffix - The container that wraps the suffix.
 */
@customElement('sl-radio-button')
export default class SlRadioButton extends ShoelaceElement {
	static override styles: CSSResultGroup = styles

	private readonly hasSlotController = new HasSlotController(this, '[default]', 'prefix', 'suffix')

	@query('.button') input: HTMLInputElement
	@query('.hidden-input') hiddenInput: HTMLInputElement

	@state() protected hasFocus = false

	/**
	 * @internal The radio button's checked state. This is exposed as an "internal" attribute so we can reflect it, making
	 * it easier to style in button groups.
	 */
	@property({ type: Boolean, reflect: true }) checked = false

	/** The radio's value. When selected, the radio group will receive this value. */
	@property() value: string

	/** Disables the radio button. */
	@property({ type: Boolean, reflect: true }) disabled = false

	/** The radio button's size. */
	@property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium'

	/** Draws a pill-style radio button with rounded edges. */
	@property({ type: Boolean, reflect: true }) pill = false

	override connectedCallback() {
		super.connectedCallback()
		this.setAttribute('role', 'presentation')
	}

	private handleBlur() {
		this.hasFocus = false
		this.emit('sl-blur')
	}

	private handleClick(e: MouseEvent) {
		if (this.disabled) {
			e.preventDefault()
			e.stopPropagation()
			return
		}

		this.checked = true
	}

	private handleFocus() {
		this.hasFocus = true
		this.emit('sl-focus')
	}

	@watch('disabled', { waitUntilFirstUpdate: true })
	handleDisabledChange() {
		this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false')
	}

	/** Sets focus on the radio button. */
	override focus(options?: FocusOptions) {
		this.input.focus(options)
	}

	/** Removes focus from the radio button. */
	override blur() {
		this.input.blur()
	}

	override render = () => {
		return html`
			<div part="base" role="presentation">
				<button
					part="${`button${this.checked ? ' button--checked' : ''}`}"
					role="radio"
					aria-checked="${this.checked}"
					class=${classMap({
						button: true,
						'button--default': true,
						'button--small': this.size === 'small',
						'button--medium': this.size === 'medium',
						'button--large': this.size === 'large',
						'button--checked': this.checked,
						'button--disabled': this.disabled,
						'button--focused': this.hasFocus,
						'button--pill': this.pill,
						'button--has-label': this.hasSlotController.test('[default]'),
						'button--has-prefix': this.hasSlotController.test('prefix'),
						'button--has-suffix': this.hasSlotController.test('suffix'),
					})}
					aria-disabled=${this.disabled}
					type="button"
					value=${ifDefined(this.value)}
					tabindex="${this.checked ? '0' : '-1'}"
					@blur=${this.handleBlur}
					@focus=${this.handleFocus}
					@click=${this.handleClick}
				>
					<slot name="prefix" part="prefix" class="button__prefix"></slot>
					<slot part="label" class="button__label"></slot>
					<slot name="suffix" part="suffix" class="button__suffix"></slot>
				</button>
			</div>
		`
	}
}
