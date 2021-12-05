/* https://www.nordtheme.com/
 * https://github.com/arcticicestudio/nord/blob/develop/src/nord.css
 * Not enough whites for Light mode, so use --nord3 or --nord9 for borders
 */
export const Nord: { [k: number]: Colour } = {
	/* ***************************************
		*** Polar Night ***
	*/
	// "Used for texts, backgrounds, carets and structuring characters like curly- and square brackets."
	// Dark mode: high contrast background
	// Light mode: main text colour
	[0]: { Hexcode: "#2e3440" },

	// "Used as a lighter background color for UI elements like status bars."
	// Dark mode: low contrast background
	// Light mode: low contrast text
	[1]: { Hexcode: "#3b4252" },

	// "In the UI scope it may be used as selection- and highlight color."
	// Dark mode: selection highlight
	// Light mode: borders
	[2]: { Hexcode: "#434c5e" },

	// "In the UI scope used as pseudoclass color for disabled elements."
	// Dark mode: Disabled content
	// Light mode: Disabled content
	[3]: { Hexcode: "#4c566a" },

	/* ***************************************
		*** Snow Storm ***
	*/
	// "In the UI scope used as semi-light background depending on the theme shading design."
	// Dark mode: low contrast text
	// Light mode: low contrast background
	[4]: { Hexcode: "#d8dee9" },

	// "Used as a lighter background color for UI elements like status bars."
	// nearly indistinguishable from Nord5
	[5]: { Hexcode: "#e5e9f0" },

	// "In the UI scope used as background, selection- and highlight color depending on the theme shading design."
	// Dark mode: main text colour
	// Light mode: high contrast background
	[6]: { Hexcode: "#eceff4" },

	/* ***************************************
		*** Frost (low sat blues) ***
	*/
	// "Bluish core color."
	[7]: { Hexcode: "#8fbcbb" },

	// "Bluish core accent color."
	// "Main color for primary UI elements"
	// "Can be used for: - Markup quotes - Markup link URLs"
	[8]: { Hexcode: "#88c0d0" },

	// "Bluish core color."
	// Special text (grey-blue)
	[9]: { Hexcode: "#81a1c1" },

	// "Bluish core color"
	// Special text (pastel blue)
	[10]: { Hexcode: "#5e81ac" },

	/* ***************************************
		*** Aurora (pastel colours) ***
	*/
	// "Used for errors"
	[11]: { Hexcode: "#bf616a" },// Red

	// "Used for annotations"
	[12]: { Hexcode: "#d08770" },// Orange

	// "In the UI scope used for warnings and git/diff renamings."
	[13]: { Hexcode: "#ebcb8b" },// Yellow

	// "In the UI scope used for git/diff additions and success visualizations."
	[14]: { Hexcode: "#a3be8c" },// Green

	// "Used for numbers."
	[15]: { Hexcode: "#b48ead" },// Purple
} as const
