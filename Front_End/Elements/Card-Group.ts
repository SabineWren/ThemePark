import { css, html, LitElement } from "lit"
import { customElement } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"
import { Aurora } from "Gradients/Aurora.js"
import { OpenProp } from "Gradients/OpenProp.js"

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
	background-image: var(--gradient-1);
}
sl-card.outline::part(base) {
	border: none;
	background: var(--sl-panel-background-color) linear-gradient(90deg
		,hsla(var(--end), 0%) 0%
		,hsla(var(--end), 40%) 19%
		,hsla(var(--start), 100%) 29%
		,hsla(var(--start), 70%) 35%
		,hsla(var(--end), 50%) 45%
		,hsla(var(--end), 15%) 70%
		,hsla(var(--end), 0%) 100%
	);
}
sl-card.outline::part(header) {
	border: none;
	margin-bottom: var(--border-width); }
sl-card.outline::part(header),
sl-card.outline::part(body),
sl-card.outline::part(footer) {
	background-color: var(--sl-panel-background-color); }

sl-card.decorative::part(base) {
	color: var(--sl-color-neutral-1000);
	background-image: var(--aurora1);
	background-size: cover;
}

sl-card.aurora::part(base) {
	background-image: var(--bg);
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
	static override get styles() { return [Shared, style, Aurora, OpenProp] }
	override render() {
		const sampleText = () => html`<p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>, sed do eiusmod <strong>tempor incididunt</strong> ut labore et dolore magna aliqua.</p>`
		return html`
<div style="width: 100%">
Card theming not yet implemented. Coming soon!
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

<div style="display: inline-flex; gap: 2rem; flex-wrap: wrap;">
	<sl-card class="aurora"
		style="--bg: var(--aurora1);">
		<div style="height: 30em;"></div>
	</sl-card>
	<sl-card class="aurora"
		style="--bg: var(--aurora1); max-width: 30em;">
		<div style="height: 15em;"></div>
	</sl-card>
</div>
<div style="display: inline-flex; gap: 2rem; flex-wrap: wrap;">
	<sl-card class="aurora"
		style="--bg: var(--aurora2);">
		<div style="height: 30em;"></div>
	</sl-card>
	<sl-card class="aurora"
		style="--bg: var(--aurora2); max-width: 30em;">
		<div style="height: 15em;"></div>
	</sl-card>
</div>
`
	}
}
