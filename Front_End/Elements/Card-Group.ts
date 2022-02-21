import { css, html, LitElement } from "lit"
import { customElement } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"

const style = css`
:host {
	display: flex; flex-direction: column; gap: 2rem;
}

sl-card {
	flex: 1 0 15rem; max-width: 25rem; }

sl-card {
	--border-radius: var(--sl-border-radius-large);
	--gradientDegree: 135deg;
}

sl-card:is(.subtle,.outline) {
	--svg-fill: url(#global-svg-gradient);
	--start: 52, 86%, 54%;
	--end: 9, 100%, 67%;
	--alpha: 20%;
	--hsl-start: hsl(var(--start));
	--hsl-end: hsl(var(--end));
	--hsla-start: hsla(var(--start), var(--alpha));
	--hsla-end: hsla(var(--end), var(--alpha));
}

/* TODO move this to theme customization */
sl-card:is(.subtle,.outline) :is(h1,h2,h3,h4,strong) {
	color: transparent;
	background: linear-gradient(var(--gradientDegree),var(--hsl-start) 0,var(--hsl-end) 100%);
	background-clip: text;
	-webkit-background-clip: text;
}

sl-card.subtle::part(base) {
	box-shadow: 1px 2px 4px 0 var(--hsla-start), 4px 8px 14px 2px var(--hsla-end);
}

sl-card.outline {
	height: fit-content;
	border-radius: var(--border-radius);
	padding: var(--sl-spacing-2x-small);
	background: var(--gradient-1); }
sl-card.outline::part(base) {
	border: none; }

sl-card.decorative {
	background: var(--card-decorative-bg); }
sl-card.decorative::part(header) {
	border: none; }
sl-card.decorative::part(base) {
	color: var(--sl-color-neutral-1000);
	background: transparent;
	backdrop-filter: blur(5px);
	border: none;
}
`
/*
TODO type CardOptions = {
	TextHeaderOrBold:
		| { type: "inherit" }
		| { type: "override"; Override: | 0 | 50 | 100 | 200 | 800 | 900 | 950 | 1000 }
		| { type: "transparent"; Gradient: ?? }
}
*/

@customElement("card-group")
class _ele extends LitElement {
	static override get styles() { return [Shared, style] }
	override render() {
		const sampleText = () => html`<p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>, sed do eiusmod <strong>tempor incididunt</strong> ut labore et dolore magna aliqua.</p>`
		return html`
<div style="width: 100%">
<select-gradient></select-gradient>
<br>Card theming not yet implemented. Coming soon!
<br>Figuring out gradients and box shadows first.
</div>

<div style="display: inline-flex; gap: 2rem; flex-wrap: wrap;">
	<sl-card class="subtle">
		<div slot="header" style="display: flex; align-items: center;">
			<h4 style="flex-grow: 1;">Subtle</h4>
			<sl-tooltip>
				<div slot="content">
					Default card type, providing a high-contrast background. May contain a stretched image.
					<br>
					<br>
					May apply a box shadow, depending on card state and theme.
				</div>
				<sl-icon name="info" library="fa"
					style="font-size: var(--sl-font-size-large);"
				></sl-icon>
			</sl-tooltip>
		</div>
		${sampleText()}
	</sl-card>

	<sl-card class="outline">
		<div slot="header" style="display: flex; align-items: center;">
			<h4 style="flex-grow: 1;">Outline</h4>
			<sl-tooltip>
				<div slot="content">
					Pops more than box-shadows. Useful for showing states like active, dragging, or dragover.
					<br>
					<br>
					Replaces the box shadow with a border, and may apply fancier text/icon colour.
				</div>
				<sl-icon name="info" library="fa"
					style="font-size: var(--sl-font-size-large);"
				></sl-icon>
			</sl-tooltip>
		</div>
		${sampleText()}
	</sl-card>

	<sl-card class="decorative">
		<div slot="header" style="display: flex; align-items: center;">
			<h4 style="flex-grow: 1;">Decorative</h4>
			<sl-tooltip>
				<div slot="content">
					Useful for modals, specials offers, and other one-off cards.
					<br>
					<br>
					Themes should apply CSS gradients or SVG backgrounds.
				</div>
				<sl-icon name="info" library="fa"
					style="font-size: var(--sl-font-size-large);"
				></sl-icon>
			</sl-tooltip>
		</div>
		${sampleText()}
	</sl-card>
</div>
`
	}
}
