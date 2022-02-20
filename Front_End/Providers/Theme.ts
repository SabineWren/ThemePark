import { ReactiveController, ReactiveControllerHost } from "lit"
import { ThrottleFactory } from "Lib.js"
import { Halloween } from "Themes/Halloween.js"
import { NordPolarNight } from "Themes/NordPolarNight.js"
import { NordSnowStorm } from "Themes/NordSnowStorm.js"
import { ShoelaceDark } from "Themes/ShoelaceDark.js"
import { ShoelaceLight } from "Themes/ShoelaceLight.js"
import { ThemeToCss } from "Themes/Platform_Targets/Shoelace.js"

export enum ThemeMode { Dark=1, Light=2 }
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

const state = (() => {
	const load = (k: string) => localStorage.getItem("theme-park-" + k)
	const mode = load("mode")
	const isLight = mode === null ? MEDIA_PREF_LIGHT.matches : mode === "light"
	return {
		Dark: THEMES_DARK.find(t => t.CssName === load("dark")) ?? THEMES_DARK[0],
		Light: THEMES_LIGHT.find(t => t.CssName === load("light")) ?? THEMES_LIGHT[0],
		Mode: isLight ? ThemeMode.Light : ThemeMode.Dark,
	}
})()
const getTheme = () =>
	state.Mode === ThemeMode.Light ? state.Light : state.Dark

export const GetThemeCss = () => ThemeToCss(getTheme()).cssText
const loadStyleTag = () => {
	const theme = getTheme()
	const style = createStyle(theme.CssName, GetThemeCss())
	$(document, `style#${theme.CssName}`)?.remove()
	$(document, "head").appendChild(style)
	$(document, "body").className = theme.CssName
}
const applyCurrentTheme = () => {
	const store = (k: string, v: string) => localStorage.setItem("theme-park-" + k, v)
	store("dark", state.Dark.CssName)
	store("light", state.Light.CssName)
	store("mode", state.Mode === ThemeMode.Light ? "light" : "dark")
	loadStyleTag()
	hosts.forEach(h => h.requestUpdate())
}

MEDIA_PREF_LIGHT.addEventListener("change", () => {
	state.Mode = MEDIA_PREF_LIGHT.matches ? ThemeMode.Light : ThemeMode.Dark
	applyCurrentTheme()
})
let hosts: ReactiveControllerHost[] = []
applyCurrentTheme()

export class ThemeProvider implements ReactiveController {
	constructor(private host: ReactiveControllerHost) { host.addController(this) }
	hostConnected() { hosts.push(this.host) }
	hostDisconnected() { hosts = hosts.filter(h => h !== this.host) }
	private reapplyTheme() {
		loadStyleTag()
		hosts.forEach(h => h.requestUpdate())
	}

	// Not the best name. Maybe call it 'brightness' or something?
	GetMode = () => state.Mode
	SetMode(m: ThemeMode) {
		state.Mode = m
		applyCurrentTheme() }

	// We only expose themes here to use their names
	// Would be safer to only return names, but that complicates changing theme
	GetThemeOptions() {
		return state.Mode === ThemeMode.Light ? THEMES_LIGHT : THEMES_DARK }
	SetTheme(o: ThemeSpecification) {
		if (o.IsLight) { state.Light = o }
		else           { state.Dark  = o }
		applyCurrentTheme()
	}

	// ********** Theme Properties **********
	GetColoursVariant = (variant: keyof ThemeColours) =>
		getTheme().TokensColourTheme[variant]
	SetColoursVariant = (() => {
		// Only the caller needs to re-render, and colours change quickly
		const applyColours = ThrottleFactory(loadStyleTag)
		return (variant: keyof ThemeColours, key: keyof ColourRange, colour: Colour) => {
			this.GetColoursVariant(variant)[key] = colour
			applyColours()
		}
	})()

	GetContrastBody = () => getTheme().ContrastBody
	SetContrastBody = (contrast: ThemeSpecification["ContrastBody"]) => {
		getTheme().ContrastBody = contrast
		this.reapplyTheme()
	}

	GetContrastPanel = () => getTheme().ContrastPanel
	SetContrastPanel  = (contrast: ThemeSpecification["ContrastPanel"]) => {
		getTheme().ContrastPanel = contrast
		this.reapplyTheme()
	}

	GetContrastText = () => getTheme().ContrastText
	SetContrastText  = (contrast: ThemeSpecification["ContrastText"]) => {
		getTheme().ContrastText = contrast
		this.reapplyTheme()
	}

	// TODO replace Setter with a form option when creating new theme
	// Changing light/dark on existing theme makes no sense
	// Can then replace Getter with the existing mode getter
	GetIsLight = () => getTheme().IsLight
	SetIsLight = (isLight: boolean) => {
		getTheme().IsLight = isLight
		this.reapplyTheme()
	}

	GetLabel = () => getTheme().Label
}
