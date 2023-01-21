import { css, html, LitElement } from "lit"
import { customElement } from "lit/decorators.js"
import { Shared } from "Elements/Style.js"

const style = css`
:host {
	height: 100vw; width: 100%;
	display: flex; flex-direction: column; gap: 1.5rem;

	--sl-transition-medium: 200ms;
	/* SVG icons TODO move to theme
	* https://shoelace.style/components/icon?id=icon-libraries
	* We set it here so we can override it later with a gradient URL as needed.
	* Only used if explicitly set by the app when registering icon libraries */
	--icon-gradient-start: var(--sl-color-primary-400);
	--icon-gradient-end: var(--sl-color-primary-800);
	--icon-fill: currentColor;
	--icon-fill: url(#global-svg-gradient);
}
.centre {
	margin-left: auto; margin-right: auto;
}
`

const cards = css`
sl-card { flex: 1 0 15rem; max-width: 25rem; }
sl-card {
	--border-radius: var(--sl-border-radius-large);
	--gradientDegree: 135deg;
	--tp-card-decorative-bg: var(--gradient-1);
}
sl-card[variant="subtle"]::part(base) {
	box-shadow: 1px 2px 4px 0 var(--hsla-start), 4px 8px 14px 2px var(--hsla-end);
}
:is(sl-card[variant="subtle"], sl-card[variant="outline"]) {
	--start: 52, 86%, 54%;
	--end: 9, 100%, 67%;
	--alpha: 20%;
	--hsl-start: hsl(var(--start));
	--hsl-end: hsl(var(--end));
	--hsla-start: hsla(var(--start), var(--alpha));
	--hsla-end: hsla(var(--end), var(--alpha));
}

h1, h2, h3, h4, p { margin: 0; margin-bottom: 0.5rem; }
p:last-child { margin-bottom: 0; }

/* TODO move this to theme customization */
:is(sl-card[variant="subtle"], sl-card[variant="outline"]) :is(h1,h2,h3,h4,strong) {
	color: transparent;
	background: linear-gradient(var(--gradientDegree),var(--hsl-start) 0,var(--hsl-end) 100%);
	background-clip: text;
	-webkit-background-clip: text;
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

@customElement("app-root")
class _ele extends LitElement {
	static override styles = [Shared, style, cards]
	override render() {
		return html`
<top-bar></top-bar>

<div class="centre" style="display: inline-flex; gap: 2rem;">
	<mode-contrast-body></mode-contrast-body>
	<mode-contrast-panel></mode-contrast-panel>
	<mode-contrast-text></mode-contrast-text>
</div>

<tab-color-editor-group class="centre"></tab-color-editor-group>

<sl-divider
	style="
	--width: 2px;
	--start: 52, 86%, 54%;
	--end: 9, 100%, 67%;
	--color: linear-gradient(135deg
		,hsla(var(--end), 0%) 0%
		,hsla(var(--end), 40%) 19%
		,hsla(var(--start), 100%) 29%
		,hsla(var(--start), 70%) 35%
		,hsla(var(--end), 50%) 45%
		,hsla(var(--end), 15%) 70%
		,hsla(var(--end), 0%) 100%
	);">
</sl-divider>

<div class="centre" style="display: flex; flex-direction: column; gap: 2rem;">
	<div style="width: 100%">
		<select-gradient></select-gradient>
		<br>Card theming not yet implemented. Coming soon!
		<br>Figuring out gradients and box shadows first.
	</div>

	<div style="display: inline-flex; gap: 2rem; flex-wrap: wrap;">
		<sl-card variant="subtle">
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

		<sl-card variant="outline">
			<div slot="header" style="display: flex; align-items: center;">
				<h4 style="flex-grow: 1;">Outline</h4>
				<sl-tooltip>
					<div slot="content">
						Pops more than box-shadows. Useful for showing states like active, dragging, or dragover.
						<br>
						<br>
						Replaces the box shadow with a border, and may apply fancier text/icon color.
					</div>
					<sl-icon name="info" library="fa"
						style="font-size: var(--sl-font-size-large);"
					></sl-icon>
				</sl-tooltip>
			</div>
			${sampleText()}
		</sl-card>

		<sl-card variant="decorative">
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
</div>
`
	}
}

const sampleText = () => html`<p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>, sed do eiusmod <strong>tempor incididunt</strong> ut labore et dolore magna aliqua.</p>`
