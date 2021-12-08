import * as chroma from "chroma.ts"
import { css } from "lit"
import { Interpolate } from "Themes/Tools/Lib.js"

const danger = (cs: chroma.Color[]) => ({
	"--sl-color-danger-50": cs[0],
	"--sl-color-danger-100": cs[1],
	"--sl-color-danger-200": cs[2],
	"--sl-color-danger-300": cs[3],
	"--sl-color-danger-400": cs[4],
	"--sl-color-danger-500": cs[5],
	"--sl-color-danger-600": cs[6],
	"--sl-color-danger-700": cs[7],
	"--sl-color-danger-800": cs[8],
	"--sl-color-danger-900": cs[9],
	"--sl-color-danger-950": cs[10],
})
export const StripDanger = (cs: chroma.Color[]) => danger(Interpolate(cs, 11))

const neutral = (cs: chroma.Color[]) => ({
	"--sl-color-neutral-0": cs[0],
	"--sl-color-neutral-50": cs[1],
	"--sl-color-neutral-100": cs[2],
	"--sl-color-neutral-200": cs[3],
	"--sl-color-neutral-300": cs[4],
	"--sl-color-neutral-400": cs[5],
	"--sl-color-neutral-500": cs[6],
	"--sl-color-neutral-600": cs[7],
	"--sl-color-neutral-700": cs[8],
	"--sl-color-neutral-800": cs[9],
	"--sl-color-neutral-900": cs[10],
	"--sl-color-neutral-950": cs[11],
	"--sl-color-neutral-1000": cs[12],
})
export const StripNeutral = (cs: chroma.Color[]) => neutral(Interpolate(cs, 13))

const primary = (cs: chroma.Color[]) => ({
	"--sl-color-primary-50": cs[0],
	"--sl-color-primary-100": cs[1],
	"--sl-color-primary-200": cs[2],
	"--sl-color-primary-300": cs[3],
	"--sl-color-primary-400": cs[4],
	"--sl-color-primary-500": cs[5],
	"--sl-color-primary-600": cs[6],
	"--sl-color-primary-700": cs[7],
	"--sl-color-primary-800": cs[8],
	"--sl-color-primary-900": cs[9],
	"--sl-color-primary-950": cs[10],
})
export const StripPrimary = (cs: chroma.Color[]) => primary(Interpolate(cs, 11))

const success = (cs: chroma.Color[]) => ({
	"--sl-color-success-50": cs[0],
	"--sl-color-success-100": cs[1],
	"--sl-color-success-200": cs[2],
	"--sl-color-success-300": cs[3],
	"--sl-color-success-400": cs[4],
	"--sl-color-success-500": cs[5],
	"--sl-color-success-600": cs[6],
	"--sl-color-success-700": cs[7],
	"--sl-color-success-800": cs[8],
	"--sl-color-success-900": cs[9],
	"--sl-color-success-950": cs[10],
})
export const StripSuccess = (cs: chroma.Color[]) => success(Interpolate(cs, 11))

const warning = (cs: chroma.Color[]) => ({
	"--sl-color-warning-50": cs[0],
	"--sl-color-warning-100": cs[1],
	"--sl-color-warning-200": cs[2],
	"--sl-color-warning-300": cs[3],
	"--sl-color-warning-400": cs[4],
	"--sl-color-warning-500": cs[5],
	"--sl-color-warning-600": cs[6],
	"--sl-color-warning-700": cs[7],
	"--sl-color-warning-800": cs[8],
	"--sl-color-warning-900": cs[9],
	"--sl-color-warning-950": cs[10],
})
export const StripWarning = (cs: chroma.Color[]) => warning(Interpolate(cs, 11))

export const ShoelaceTokensShared = css`
:root, :host, body {
	/* Border radii */
	--sl-border-radius-small: 0.1875rem; /* 3px */
	--sl-border-radius-medium: 0.25rem; /* 4px */
	--sl-border-radius-large: 0.5rem; /* 8px */
	--sl-border-radius-x-large: 1rem; /* 16px */

	--sl-border-radius-circle: 50%;
	--sl-border-radius-pill: 9999px;

	/* Spacings */
	--sl-spacing-3x-small: 0.125rem; /* 2px */
	--sl-spacing-2x-small: 0.25rem; /* 4px */
	--sl-spacing-x-small: 0.5rem; /* 8px */
	--sl-spacing-small: 0.75rem; /* 12px */
	--sl-spacing-medium: 1rem; /* 16px */
	--sl-spacing-large: 1.25rem; /* 20px */
	--sl-spacing-x-large: 1.75rem; /* 28px */
	--sl-spacing-2x-large: 2.25rem; /* 36px */
	--sl-spacing-3x-large: 3rem; /* 48px */
	--sl-spacing-4x-large: 4.5rem; /* 72px */

	/* Transitions */
	--sl-transition-x-slow: 1000ms;
	--sl-transition-slow: 500ms;
	--sl-transition-medium: 250ms;
	--sl-transition-fast: 150ms;
	--sl-transition-x-fast: 50ms;

	/*** Typography ***/
	/* Fonts */
	--sl-font-mono: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
	--sl-font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
		'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
	--sl-font-serif: Georgia, 'Times New Roman', serif;

	/* Font sizes */
	--sl-font-size-2x-small: 0.625rem; /* 10px */
	--sl-font-size-x-small: 0.75rem; /* 12px */
	--sl-font-size-small: 0.875rem; /* 14px */
	--sl-font-size-medium: 1rem; /* 16px */
	--sl-font-size-large: 1.25rem; /* 20px */
	--sl-font-size-x-large: 1.5rem; /* 24px */
	--sl-font-size-2x-large: 2.25rem; /* 36px */
	--sl-font-size-3x-large: 3rem; /* 48px */
	--sl-font-size-4x-large: 4.5rem; /* 72px */

	/* Font weights */
	--sl-font-weight-light: 300;
	--sl-font-weight-normal: 400;
	--sl-font-weight-semibold: 500;
	--sl-font-weight-bold: 700;

	/* Letter spacings */
	--sl-letter-spacing-denser: -0.03em;
	--sl-letter-spacing-dense: -0.015em;
	--sl-letter-spacing-normal: normal;
	--sl-letter-spacing-loose: 0.075em;
	--sl-letter-spacing-looser: 0.15em;

	/* Line heights */
	--sl-line-height-denser: 1;
	--sl-line-height-dense: 1.4;
	--sl-line-height-normal: 1.8;
	--sl-line-height-loose: 2.2;
	--sl-line-height-looser: 2.6;

	/*** Forms ***/
	/* Buttons */
	--sl-button-font-size-small: var(--sl-font-size-x-small);
	--sl-button-font-size-medium: var(--sl-font-size-small);
	--sl-button-font-size-large: var(--sl-font-size-medium);

	/* Inputs */
	--sl-input-height-small: 1.875rem; /* 30px */
	--sl-input-height-medium: 2.5rem; /* 40px */
	--sl-input-height-large: 3.125rem; /* 50px */
	--sl-input-border-width: 1px;

	--sl-input-border-radius-small: var(--sl-border-radius-medium);
	--sl-input-border-radius-medium: var(--sl-border-radius-medium);
	--sl-input-border-radius-large: var(--sl-border-radius-medium);

	--sl-input-font-family: var(--sl-font-sans);
	--sl-input-font-weight: var(--sl-font-weight-normal);
	--sl-input-font-size-small: var(--sl-font-size-small);
	--sl-input-font-size-medium: var(--sl-font-size-medium);
	--sl-input-font-size-large: var(--sl-font-size-large);
	--sl-input-letter-spacing: var(--sl-letter-spacing-normal);

	--sl-input-spacing-small: var(--sl-spacing-small);
	--sl-input-spacing-medium: var(--sl-spacing-medium);
	--sl-input-spacing-large: var(--sl-spacing-large);

	/* Labels */
	--sl-input-label-font-size-small: var(--sl-font-size-small);
	--sl-input-label-font-size-medium: var(--sl-font-size-medium);
	--sl-input-label-font-size-large: var(--sl-font-size-large);

	--sl-input-label-color: inherit;

	/* Help text */
	--sl-input-help-text-font-size-small: var(--sl-font-size-x-small);
	--sl-input-help-text-font-size-medium: var(--sl-font-size-small);
	--sl-input-help-text-font-size-large: var(--sl-font-size-medium);

	/* Toggles (checkboxes, radios, switches) */
	--sl-toggle-size: 1rem;

	/* Panels */
	--sl-panel-border-width: 1px;

	/* Tooltips */
	--sl-tooltip-border-radius: var(--sl-border-radius-medium);
	--sl-tooltip-font-family: var(--sl-font-sans);
	--sl-tooltip-font-weight: var(--sl-font-weight-normal);
	--sl-tooltip-font-size: var(--sl-font-size-small);
	--sl-tooltip-line-height: var(--sl-line-height-dense);
	--sl-tooltip-padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-small);
	--sl-tooltip-arrow-size: 5px;
	--sl-tooltip-arrow-start-end-offset: 8px;

	/* Z-indexes */
	--sl-z-index-drawer: 700;
	--sl-z-index-dialog: 800;
	--sl-z-index-dropdown: 900;
	--sl-z-index-toast: 950;
	--sl-z-index-tooltip: 1000;
}`
