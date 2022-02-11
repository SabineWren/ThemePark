import { css } from "lit"

export const Style = css`
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
	box-shadow: var(--sl-shadow-large);
}
sl-card::part(body) {
	display: flex; flex-direction: column; gap: var(--spacing);
}

/* Input Controls */
.toggle-btn {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

/* Output */
#swatches { gap: 5px }
.swatch {
	display: inline-block;
	flex-basis: 1rem; flex-grow: 1;
	min-width: 1rem;
	height: var(--swatch-size);
	border-radius: 2px;
}

sl-color-picker {
	--grid-width: 320px;
	--swatch-size: 30px;
}
sl-color-picker::part(base) {
	width: 100%;
	box-shadow: none; }

table {
	margin-right: auto;
	border-collapse: separate;
	border-spacing: 0; }
td { padding: 0; }
`
