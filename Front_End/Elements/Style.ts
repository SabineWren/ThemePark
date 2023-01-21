import { css } from "lit"

export const Shared = css`
* { box-sizing: border-box; }

sl-dropdown sl-button sl-icon[slot="suffix"] {
	font-size: 1rem;
	transition: var(--sl-transition-medium) transform ease; }
sl-dropdown[disabled] sl-button sl-icon[slot="suffix"] {
	display: none; }
sl-dropdown[open] sl-button sl-icon[slot="suffix"] {
  transform: rotate(-180deg); }

sl-dropdown sl-menu-item::part(label) {
	width: max-content;
	max-width: 35rem;
	white-space: normal;
	font-size: 0.9rem;
}

sl-dropdown sl-menu-item::part(base) {
	--sl-color-neutral-700: var(--sl-color-neutral-900); }
sl-dropdown sl-menu-item[checked]::part(label) {
	--sl-color-neutral-700: var(--sl-color-neutral-1000);
	font-weight: bold;
}

sl-radio-group::part(form-control) { margin: unset; }

/* TODO figure out how to theme icon colors without breaking app overrides */
sl-button:not([variant="default"]) sl-icon {
	--icon-fill: currentColor;
}
`
