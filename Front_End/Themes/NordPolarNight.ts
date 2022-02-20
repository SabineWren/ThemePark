import { Nord } from "Themes/Palettes/NordPalette.js"

export const NordPolarNight = (): ThemeSpecification => ({
	ContrastBody: 200,
	// ContrastButtonHover: 500,
	ContrastPanel: 50,
	ContrastText: 900,
	CssName: "sl-nord-polar-night",
	IsLight: false,
	Label: "Nord - Polar Night",
	TokensColourTheme: colours,
})

const colours: ThemeColours = {
	danger: {
		Min: Nord.C11_RedCustom1,
		C500: Nord.C11_RedCustom2,
		C600: Nord.C11_Red,
		Max: Nord.C11_RedCustom4,
	},
	neutral: {
		Min: Nord.Black,
		C500: Nord.GreyDark1,
		C600: Nord.GreyDark2,
		Max: Nord.White,
	},
	primary: {
		Min: Nord.Blue8Custom1,
		C500: Nord.Blue8Custom2,
		C600: Nord.Blue8,
		Max: Nord.Blue8Custom4,
	},
	success: {
		Min: Nord.Green14Custom1,
		C500: Nord.Green14Custom2,
		C600: Nord.Green14,
		Max: Nord.Green14Custom4,
	},
	warning: {
		Min: Nord.Yellow13Custom1,
		C500: Nord.Yellow13Custom2,
		C600: Nord.Yellow13,
		Max: Nord.Yellow13Custom4,
	},
}
