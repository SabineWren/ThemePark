import { ReactiveController, ReactiveControllerHost } from "lit"
import { ThemeToCss } from "Platform_Targets/Shoelace.js"
import { Halloween } from "Themes/Halloween.js"
import { NordPolarNight } from "Themes/NordPolarNight.js"
import { NordSnowStorm } from "Themes/NordSnowStorm.js"
import { ShoelaceDark } from "Themes/ShoelaceDark.js"
import { ShoelaceLight } from "Themes/ShoelaceLight.js"
import { ThrottleFactory } from "Utilities/Throttle.js"

export enum ThemeLightness { Dark=1, Light=2 }
const MEDIA_PREF_LIGHT = window.matchMedia("(prefers-color-scheme: light)")
const THEMES_DARK = [
	ShoelaceDark(),
	NordPolarNight(),
	Halloween(),
] as const
const THEMES_LIGHT = [
	ShoelaceLight(),
	NordSnowStorm(),
] as const

const createStyle = (id: string, cssText: string) => {
	const style = document.createElement("style")
	style.id = id
	style.innerHTML = cssText
	return style
}

const persisted = (() => {
	const [DARK, LIGHT, LIGHTNESS] = [`theme-park-dark`, `theme-park-light`, `theme-park-lightness`]
	const GetDark = () => THEMES_DARK.find(t => t.CssName === localStorage.getItem(DARK))
		?? THEMES_DARK[0]
	const GetLight = () => THEMES_LIGHT.find(t => t.CssName === localStorage.getItem(LIGHT))
		?? THEMES_LIGHT[0]
	const GetLightness = () => {
		const lightness = localStorage.getItem(LIGHTNESS)
		const isLight = lightness === null
			? MEDIA_PREF_LIGHT.matches
			: lightness === "light"
		return isLight ? ThemeLightness.Light : ThemeLightness.Dark
	}
	return {
		GetDark, GetLight, GetLightness,
		GetTheme: () => GetLightness() === ThemeLightness.Light ? GetLight() : GetDark(),
		SetDark: (v: string) => localStorage.setItem(DARK, v),
		SetLight: (v: string) => localStorage.setItem(LIGHT, v),
		SetLightness: (v: ThemeLightness) =>
			localStorage.setItem(LIGHTNESS, v === ThemeLightness.Light ? "light" : "dark"),
	}
})()

// TODO move state from provider variable to theme
let gradient = `url("./aurora/aurora-corners.svg")`

export const GetThemeCss = () => ThemeToCss(persisted.GetTheme(), gradient).cssText
const appendCssColors = ThrottleFactory(() => {
	const theme = persisted.GetTheme()
	const style = createStyle(theme.CssName, GetThemeCss())
	$(document, `style#${theme.CssName}`)?.remove()
	$(document, "head").appendChild(style)
	$(document, "body").className = theme.CssName
})
const forceRefresh = () => {
	appendCssColors()
	hosts.forEach(h => h.requestUpdate())
}

let hosts: ReactiveControllerHost[] = []
forceRefresh()
MEDIA_PREF_LIGHT.addEventListener("change", () => {
	persisted.SetLightness(MEDIA_PREF_LIGHT.matches ? ThemeLightness.Light : ThemeLightness.Dark)
	forceRefresh()
})

export class ThemeProvider implements ReactiveController {
	constructor(private host: ReactiveControllerHost) { host.addController(this) }
	hostConnected() { hosts.push(this.host) }
	hostDisconnected() { hosts = hosts.filter(h => h !== this.host) }
	GetLightness = () => persisted.GetLightness()
	SetLightness = (m: ThemeLightness) => { persisted.SetLightness(m); forceRefresh() }

	// We only expose themes here to use their names
	// Would be safer to only return names, but that complicates changing theme
	GetThemeOptions = () =>
		persisted.GetLightness() === ThemeLightness.Light ? THEMES_LIGHT : THEMES_DARK
	SetTheme = (o: ThemeSpecification) => {
		if (o.IsLight) {
			persisted.SetLight(o.CssName)
			persisted.SetLightness(ThemeLightness.Light)
		}
		else {
			persisted.SetDark(o.CssName)
			persisted.SetLightness(ThemeLightness.Dark)
		}
		forceRefresh()
	}

	// ********** Theme Properties **********
	GetColorsVariant = (variant: keyof ThemeColors) =>
		persisted.GetTheme().TokensColorTheme[variant]
	SetColorsVariant = (() => {
		return (variant: keyof ThemeColors, key: keyof ColorRange, color: Color) => {
			this.GetColorsVariant(variant)[key] = color
			appendCssColors()
		}
	})()

	GetContrastBody = () => persisted.GetTheme().ContrastBody
	SetContrastBody = (contrast: ThemeSpecification["ContrastBody"]) => {
		persisted.GetTheme().ContrastBody = contrast
		forceRefresh()
	}

	GetContrastPanel = () => persisted.GetTheme().ContrastPanel
	SetContrastPanel = (contrast: ThemeSpecification["ContrastPanel"]) => {
		persisted.GetTheme().ContrastPanel = contrast
		forceRefresh()
	}

	GetContrastText = () => persisted.GetTheme().ContrastText
	SetContrastText = (contrast: ThemeSpecification["ContrastText"]) => {
		persisted.GetTheme().ContrastText = contrast
		forceRefresh()
	}

	// TODO Create a form option when creating new theme
	// Changing light/dark on existing theme makes no sense
	GetIsLight = () => persisted.GetTheme().IsLight
	/* SetIsLight = (isLight: boolean) => {
		persisted.GetTheme().IsLight = isLight
		forceRefresh()
	}*/

	GetLabel = () => persisted.GetTheme().Label

	// TODO move state from provider variable to theme
	GetGradient = () => gradient
	SetGradient = (grad: string) => {
		gradient = grad
		forceRefresh()
	}
}
