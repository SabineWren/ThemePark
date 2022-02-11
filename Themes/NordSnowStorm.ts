import { Nord } from "Themes/Palettes/NordPalette.js"

export const NordSnowStorm = (): ThemeSpecification => ({
	ContrastBody: 50,
	// ContrastButtonHover: 600,
	ContrastPanel: 0,
	ContrastText: 900,
	CssName: "sl-nord-snow-storm",
	IsLight: true,
	Label: "Nord - Snow Storm",
	TokensColourTheme: colours,
})

const colours: ThemeColours = {
	danger: {
		Min: Nord.C11_RedCustom4,
		C500: Nord.C11_Red,
		C600: Nord.C11_RedCustom2,
		Max: Nord.C11_RedCustom1,
	},
	neutral: {
		Min: Nord.White,
		C500: Nord.GreyDark2,
		C600: Nord.GreyDark1,
		Max: Nord.Black,
	},
	primary: {
		Min: Nord.Blue8Custom4,
		C500: Nord.Blue8,
		C600: Nord.Blue8Custom2,
		Max: Nord.Blue8Custom1,
	},
	success: {
		Min: Nord.Green14Custom4,
		C500: Nord.Green14,
		C600: Nord.Green14Custom2,
		Max: Nord.Green14Custom1,
	},
	warning: {
		Min: Nord.Yellow13Custom4,
		C500: Nord.Yellow13,
		C600: Nord.Yellow13Custom2,
		Max: Nord.Yellow13Custom1,
	},
}
