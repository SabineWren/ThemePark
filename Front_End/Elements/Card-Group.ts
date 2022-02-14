import { css, html, LitElement } from "lit"
import { customElement } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"

/* @License
	Gradients css copied from Open Props "props.gradients.css"
	https://github.com/argyleink/open-props
	Copyright Adam Argyle 2021
	Licensed under MIT
	TODO replace most of these with good customization tooling
*/
const gradients = css`
:host {
	--gradient-1: linear-gradient(to bottom right,#1f005c, #5b0060, #870160, #ac255e, #ca485c, #e16b5c, #f39060, #ffb56b);
	--gradient-2: linear-gradient(to bottom right,#48005c, #8300e2, #a269ff);
	--gradient-3:
		radial-gradient(
			circle at top right,
			hsl(180 100% 50%), hsl(180 100% 50% / 0%)
		),
		radial-gradient(
			circle at bottom left,
			hsl(328 100% 54%), hsl(328 100% 54% / 0%)
		);
	--gradient-4: linear-gradient(to bottom right,#00F5A0,#00D9F5);
	--gradient-5: conic-gradient(from -270deg at 75% 110%, fuchsia, floralwhite);
	--gradient-6: conic-gradient(from -90deg at top left, black, white);
	--gradient-7: linear-gradient(to bottom right,#72C6EF,#004E8F);
	--gradient-8: conic-gradient(from 90deg at 50% 0%, #111, 50%, #222, #111);
	--gradient-9: conic-gradient(from .5turn at bottom center, lightblue, white);
	--gradient-10: conic-gradient(from 90deg at 40% -25%, #ffd700, #f79d03, #ee6907, #e6390a, #de0d0d, #d61039, #cf1261, #c71585, #cf1261, #d61039, #de0d0d, #ee6907, #f79d03, #ffd700, #ffd700, #ffd700);
	--gradient-11: conic-gradient(at bottom left, deeppink, cyan);
	--gradient-12: conic-gradient(from 90deg at 25% -10%, #ff4500, #d3f340, #7bee85, #afeeee, #7bee85);
	--gradient-13: radial-gradient(circle at 50% 200%, #000142, #3b0083, #b300c3, #ff059f, #ff4661, #ffad86, #fff3c7);
	--gradient-14: conic-gradient(at top right, lime, cyan);
	--gradient-15: linear-gradient(to bottom right, #c7d2fe, #fecaca, #fef3c7);
	--gradient-16: radial-gradient(circle at 50% -250%, #374151, #111827, #000);
	--gradient-17: conic-gradient(from -90deg at 50% -25%, blue, blueviolet);
	--gradient-18:
		linear-gradient(0deg,   hsla(0   100% 50% / 80%), hsla(0   100% 50% / 0) 75%),
		linear-gradient(60deg,  hsla(60  100% 50% / 80%), hsla(60  100% 50% / 0) 75%),
		linear-gradient(120deg, hsla(120 100% 50% / 80%), hsla(120 100% 50% / 0) 75%),
		linear-gradient(180deg, hsla(180 100% 50% / 80%), hsla(180 100% 50% / 0) 75%),
		linear-gradient(240deg, hsla(240 100% 50% / 80%), hsla(240 100% 50% / 0) 75%),
		linear-gradient(300deg, hsla(300 100% 50% / 80%), hsla(300 100% 50% / 0) 75%);
	--gradient-19: linear-gradient(to bottom right,#ffe259,#ffa751);
	--gradient-20: conic-gradient(from -135deg at -10% center, #ffa500, #ff7715, #ff522a, #ff3f47, #ff5482, #ff69b4);
	--gradient-21: conic-gradient(from -90deg at 25% 115%, #ff0000, #ff0066, #ff00cc, #cc00ff, #6600ff, #0000ff, #0000ff, #0000ff, #0000ff);
	--gradient-22: linear-gradient(to bottom right,#acb6e5,#86fde8);
	--gradient-23: linear-gradient(to bottom right,#536976,#292E49);
	--gradient-24: conic-gradient(from .5turn at 0% 0%, #00c476, 10%, #82b0ff, 90%, #00c476);
	--gradient-25: conic-gradient(at 125% 50%, #b78cf7, #ff7c94, #ffcf0d, #ff7c94, #b78cf7);
	--gradient-26: linear-gradient(to bottom right,#9796f0,#fbc7d4);
	--gradient-27: conic-gradient(from .5turn at bottom left, deeppink, rebeccapurple);
	--gradient-28: conic-gradient(from -90deg at 50% 105%, white, orchid);
	--gradient-29:
		radial-gradient(
			circle at top right,
			hsl(250 100% 85%), hsl(250 100% 85% / 0%)
		),
		radial-gradient(
			circle at bottom left,
			hsl(220 90% 75%), hsl(220 90% 75% / 0%)
		);
	--gradient-30: radial-gradient(
			circle at top right,
			hsl(150 100% 50%), hsl(150 100% 50% / 0%)
		),
		radial-gradient(
			circle at bottom left,
			hsl(150 100% 84%), hsl(150 100% 84% / 0%)
		);
}
`

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

sl-card.decorative::part(base) {
	color: var(--sl-color-neutral-1000);
	/* TODO replace this before enabling exports. I don't have copyright for the image. */
	background-image: url("/Aurora.jpg");
	background-size: cover;
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
	static override get styles() { return [Shared, style, gradients] }
	override render() {
		const sampleText = () => html`<p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>, sed do eiusmod <strong>tempor incididunt</strong> ut labore et dolore magna aliqua.</p>`
		return html`
<div style="width: 100%">
Card theming not yet implemented. Coming soon!
</div>

<div style="display: inline-flex; gap: 2rem; flex-wrap: wrap;">
	<sl-card class="subtle">
		<div slot="header" style="display: flex; align-items: center;">
			<h4 style="flex-grow: 1;">Subtle</h4>
			<sl-tooltip content="Default card type, providing a high-contrast background. May contain a stretched image. Themes may apply a box shadow.">
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
			<sl-tooltip content="Replaces the box shadow with a border. May apply fancier text/icon colour.">
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
			<sl-tooltip content="Low-contrast background. Themes may decorate with gradients, transparency effects, etc. Themes should darken the centre to improve text contrast.">
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
