import { css } from "lit"

export const Style = css`
* { min-width: unset; }
:host {
	display: inline-block;
	--spacing: 1.5rem;
	--swatch-size: 62px;
}
h1 {
	font-size: 1.5rem;
	font-weight: 300;
	text-align: center;
	margin: 0 0 var(--spacing) 0;
}
sl-card {
	margin: 0 auto; }
sl-card::part(base) {
	--padding: var(--spacing);
	border: none;
	box-shadow: var(--sl-shadow-large);
}

#result {
	display: flex;
	gap: 5px;
	margin-bottom: var(--spacing);
}

.swatch {
	display: inline-block;
	width: var(--swatch-size);
	height: var(--swatch-size);
	border-radius: 2px;
}
.inputs { display: flex; gap: var(--spacing); }

sl-color-picker::part(base) {
	box-shadow: none; }

.right { flex: 1 1 28em; }
sl-textarea::part(textarea) {
	font-family: var(--sl-font-mono);
	font-size: 14px;
	height: 350px;
}

a { color: inherit; }
a:hover {
	color: rgb(var(--sl-color-primary-600)); }

footer {
	text-align: center;
	margin-top: calc(var(--spacing) / 2);
}
small:not(:first-child):before { content: '·'; }
`
