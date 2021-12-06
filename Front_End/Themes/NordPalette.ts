import { Hsl } from "./Tools/Lib.js"
/* https://www.nordtheme.com/
 * https://github.com/arcticicestudio/nord/blob/develop/src/nord.css
 * Not enough whites for Light mode, so use --nord3 or --nord9 for borders
 */
export const Nord = {
	/* ***************************************
		*** Polar Night ***
	*/
	// "Used for texts, backgrounds, carets and structuring characters like curly- and square brackets."
	// Dark mode: high contrast background
	// Light mode: main text colour
	[0]: Hsl(220, 16, 22),

	// "Used as a lighter background color for UI elements like status bars."
	// Dark mode: low contrast background
	// Light mode: low contrast text
	[1]: Hsl(220, 16, 28),

	// "In the UI scope it may be used as selection- and highlight color."
	// Dark mode: selection highlight
	// Light mode: borders
	[2]: Hsl(220, 17, 32),

	// "In the UI scope used as pseudoclass color for disabled elements."
	// Dark mode: Disabled content
	// Light mode: Disabled content
	[3]: Hsl(220, 16, 36),

	/* ***************************************
		*** Snow Storm ***
	*/
	// "In the UI scope used as semi-light background depending on the theme shading design."
	// Dark mode: low contrast text
	// Light mode: low contrast background
	[4]: Hsl(219, 28, 88),

	// "Used as a lighter background color for UI elements like status bars."
	// nearly indistinguishable from Nord5
	[5]: Hsl(218, 27, 92),

	// "In the UI scope used as background, selection- and highlight color depending on the theme shading design."
	// Dark mode: main text colour
	// Light mode: high contrast background
	[6]: Hsl(218, 27, 94),

	/* ***************************************
		*** Frost (low sat blues) ***
	*/
	// "Bluish core color."
	[7]: Hsl(179, 25, 65),

	// "Bluish core accent color."
	// "Main color for primary UI elements"
	// "Can be used for: - Markup quotes - Markup link URLs"
	[8]: Hsl(193, 43, 67),

	// "Bluish core color."
	// Special text (grey-blue)
	[9]: Hsl(210, 34, 63),

	// "Bluish core color"
	// Special text (pastel blue)
	[10]: Hsl(213, 32, 52),

	/* ***************************************
		*** Aurora (pastel colours) ***
	*/
	// "Used for errors"
	[11]: Hsl(354, 42, 56),// Red

	// "Used for annotations"
	[12]: Hsl(14, 51, 63),// Orange

	// "In the UI scope used for warnings and git/diff renamings."
	[13]: Hsl(40, 71, 73),// Yellow

	// "In the UI scope used for git/diff additions and success visualizations."
	[14]: Hsl(92, 28, 65),// Green

	// "Used for numbers."
	[15]: Hsl(311, 20, 63),// Purple
} as const
