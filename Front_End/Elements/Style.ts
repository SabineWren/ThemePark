import { css } from "lit"

export const Shared = css`
* { box-sizing: border-box; }

h1, h2, h3, h4, p {
	margin: 0;
	margin-bottom: 0.5rem; }
p:last-child {
	margin-bottom: 0; }
`
export const StyleToggleBtn = css`
.toggle-btn {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	user-select: none;
}
/* Puts focus ring (border) above other buttons when selected */
sl-button[selected] { z-index: 3; }
sl-button[selected]::part(base) {
	border-color: var(--sl-color-primary-200);
	box-shadow: 0 0 10px 4px var(--sl-color-primary-100) inset; }
sl-button[selected]:hover::part(base) {
	border-color: var(--sl-color-primary-300);
	box-shadow: 0 0 10px 6px var(--sl-color-primary-100) inset; }
`
