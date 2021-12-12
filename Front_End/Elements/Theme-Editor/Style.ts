import { css } from "lit"

export const Style = css`
* { min-width: unset; }
:host {
	display: inline-block;
	--spacing: 1.5rem;
	--swatch-size: 62px;
}
.flex { display: flex; gap: var(--spacing); }

sl-card {
	margin: 0 auto; }
sl-card::part(base) {
	--padding: var(--spacing);
	border: none;
	box-shadow: var(--sl-shadow-large);
}
sl-card::part(body) {
	display: flex; flex-direction: column; gap: var(--spacing);
}

#swatches { gap: 5px }
.swatch {
	display: inline-block;
	width: var(--swatch-size);
	height: var(--swatch-size);
	border-radius: 2px;
}

sl-icon-button { margin-right: 0.5em; }
sl-icon-button::part(base) { padding: 0; font-size: 1.4rem; }
sl-icon-button[type="danger"]::part(base) { color: var(--sl-color-danger-600); }
sl-icon-button[type="success"]::part(base) { color: var(--sl-color-success-600); }
sl-tag::part(base):hover { cursor: pointer; }
sl-tag::part(base) { background: var(--background); }
sl-tag::part(content) { color: var(--colour); }

sl-color-picker {
	--grid-width: 320px;
	--swatch-size: 30px;
}
sl-color-picker::part(base) {
	box-shadow: none; }

table {
	margin-right: auto;
	border-collapse: separate;
	border-spacing: 0; }
td { padding: 0; }
`
