type Hsl = { H: number; S: number; L: number; A?: number }
type Colour = Hsl | string

type BoxShadow = { XYBlurSpread: string; Colour: Colour }

type ThemeTargetShoelace = {
	// Primary
	"--sl-color-primary-50": Colour
	"--sl-color-primary-100": Colour
	"--sl-color-primary-200": Colour
	"--sl-color-primary-300": Colour
	"--sl-color-primary-400": Colour
	"--sl-color-primary-500": Colour
	"--sl-color-primary-600": Colour
	"--sl-color-primary-700": Colour
	"--sl-color-primary-800": Colour
	"--sl-color-primary-900": Colour
	"--sl-color-primary-950": Colour

	// Success
	"--sl-color-success-50": Colour
	"--sl-color-success-100": Colour
	"--sl-color-success-200": Colour
	"--sl-color-success-300": Colour
	"--sl-color-success-400": Colour
	"--sl-color-success-500": Colour
	"--sl-color-success-600": Colour
	"--sl-color-success-700": Colour
	"--sl-color-success-800": Colour
	"--sl-color-success-900": Colour
	"--sl-color-success-950": Colour

	// Warning
	"--sl-color-warning-50": Colour
	"--sl-color-warning-100": Colour
	"--sl-color-warning-200": Colour
	"--sl-color-warning-300": Colour
	"--sl-color-warning-400": Colour
	"--sl-color-warning-500": Colour
	"--sl-color-warning-600": Colour
	"--sl-color-warning-700": Colour
	"--sl-color-warning-800": Colour
	"--sl-color-warning-900": Colour
	"--sl-color-warning-950": Colour

	//
	"--sl-color-danger-50": Colour
	"--sl-color-danger-100": Colour
	"--sl-color-danger-200": Colour
	"--sl-color-danger-300": Colour
	"--sl-color-danger-400": Colour
	"--sl-color-danger-500": Colour
	"--sl-color-danger-600": Colour
	"--sl-color-danger-700": Colour
	"--sl-color-danger-800": Colour
	"--sl-color-danger-900": Colour
	"--sl-color-danger-950": Colour

	// Neutral
	"--sl-color-neutral-0": Colour
	"--sl-color-neutral-50": Colour
	"--sl-color-neutral-100": Colour
	"--sl-color-neutral-200": Colour
	"--sl-color-neutral-300": Colour
	"--sl-color-neutral-400": Colour
	"--sl-color-neutral-500": Colour
	"--sl-color-neutral-600": Colour
	"--sl-color-neutral-700": Colour
	"--sl-color-neutral-800": Colour
	"--sl-color-neutral-900": Colour
	"--sl-color-neutral-950": Colour
	"--sl-color-neutral-1000": Colour

	// Elevations (box shadows)
	"--sl-shadow-x-small": BoxShadow
	"--sl-shadow-small": BoxShadow
	"--sl-shadow-medium": BoxShadow
	"--sl-shadow-large": BoxShadow
	"--sl-shadow-x-large": BoxShadow

	// *** Forms ***
	"--sl-focus-ring": BoxShadow

	"--sl-input-background-color": Colour
	"--sl-input-background-color-hover": Colour
	"--sl-input-background-color-focus": Colour
	"--sl-input-background-color-disabled": Colour
	"--sl-input-border-color": Colour
	"--sl-input-border-color-hover": Colour
	"--sl-input-border-color-focus": Colour
	"--sl-input-border-color-disabled": Colour

	"--sl-input-color": Colour
	"--sl-input-color-hover": Colour
	"--sl-input-color-focus": Colour
	"--sl-input-color-disabled": Colour
	"--sl-input-icon-color": Colour
	"--sl-input-icon-color-hover": Colour
	"--sl-input-icon-color-focus": Colour
	"--sl-input-placeholder-color": Colour
	"--sl-input-placeholder-color-disabled": Colour

	"--sl-input-filled-background-color": Colour
	"--sl-input-filled-background-color-hover": Colour
	"--sl-input-filled-background-color-focus": Colour
	"--sl-input-filled-background-color-disabled": Colour
	"--sl-input-filled-color": Colour
	"--sl-input-filled-color-hover": Colour
	"--sl-input-filled-color-focus": Colour
	"--sl-input-filled-color-disabled": Colour

	// can default to var(--sl-color-neutral-500)
	"--sl-input-help-text-color": Colour

	// Overlays
	"--sl-overlay-background-color": Colour

	// Panels
	"--sl-panel-background-color": Colour
	"--sl-panel-border-color": Colour

	// Tooltips
	"--sl-tooltip-background-color": Colour
	"--sl-tooltip-color": Colour
}
type ThemeValue = ThemeTargetShoelace[keyof ThemeTargetShoelace]
