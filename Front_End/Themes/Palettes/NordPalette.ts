import { Hsl } from "Lib/Colors.js"
// https://www.nordtheme.com/
// https://github.com/arcticicestudio/nord/blob/develop/src/nord.css
export const Nord = {
	// Custom
	White: Hsl(220, 27, 98),
	GreyLight: Hsl(220, 17, 60),
	GreyDark: Hsl(220, 17, 44),
	Black: Hsl(220, 16, 13),

	/* ***************************************
		*** Polar Night ***
	*/
	// "Used for texts, backgrounds, carets and structuring characters like curly- and square brackets."
	// Dark mode: high contrast background
	// Light mode: main text color
	// [0]: Hsl(220, 16, 22),

	// "Used as a lighter background color for UI elements like status bars."
	// Dark mode: low contrast background
	// Light mode: low contrast text
	// [1]: Hsl(220, 16, 28),

	// "In the UI scope it may be used as selection- and highlight color."
	// Dark mode: selection highlight
	// Light mode: borders
	// [2]: Hsl(220, 17, 32),

	// "In the UI scope used as pseudoclass color for disabled elements."
	// Dark mode: Disabled content
	// Light mode: Disabled content
	// [3]: Hsl(220, 16, 36),

	/* ***************************************
		*** Snow Storm ***
	*/
	// "In the UI scope used as semi-light background depending on the theme shading design."
	// Dark mode: low contrast text
	// Light mode: low contrast background
	// [4]: Hsl(219, 28, 88),

	// "Used as a lighter background color for UI elements like status bars."
	// nearly indistinguishable from Nord5
	// [5]: Hsl(218, 27, 92),

	// "In the UI scope used as background, selection- and highlight color depending on the theme shading design."
	// Dark mode: main text color
	// Light mode: high contrast background
	// [6]: Hsl(218, 27, 94),

	/* ***************************************
		*** Frost (low sat blues) ***
	*/
	// "Bluish core color."
	// [7]: Hsl(179, 25, 65),

	// "Bluish core accent color."
	// "Main color for primary UI elements"
	// "Can be used for: - Markup quotes - Markup link URLs"
	Blue8Custom1: Hsl(200, 35, 21),
	// Official site uses Hsl(193, 43, 63) on hover, but it's low contrast
	Blue8Custom2: Hsl(193, 43, 55),
	Blue8: Hsl(193, 43, 67),
	Blue8Custom4: Hsl(185, 73, 92),

	// "Bluish core color."
	// Special text (grey-blue)
	// [9]: Hsl(210, 34, 63),

	// "Bluish core color"
	// Special text (pastel blue)
	// [10]: Hsl(213, 32, 52),

	/* ***************************************
		*** Aurora (pastel colors) ***
	*/
	// "Used for errors"
	C11_RedCustom1: Hsl(354, 38, 10),
	C11_RedCustom2: Hsl(354, 42, 50),
	C11_Red: Hsl(354, 42, 56),
	C11_RedCustom4: Hsl(354, 100, 80),

	// "Used for annotations"
	Orange12: Hsl(14, 51, 63),

	// "In the UI scope used for warnings and git/diff renamings."
	Yellow13Custom1: Hsl(20, 50, 20),
	Yellow13Custom2: Hsl(40, 71, 52),
	Yellow13: Hsl(40, 71, 73),
	Yellow13Custom4: Hsl(60, 100, 95),

	// "In the UI scope used for git/diff additions and success visualizations."
	Green14Custom1: Hsl(98, 25, 25),
	Green14Custom2: Hsl(92, 28, 53),
	Green14: Hsl(92, 28, 65),
	Green14Custom4: Hsl(80, 80, 86),

	// "Used for numbers."
	Purple15: Hsl(311, 20, 63),
} as const
