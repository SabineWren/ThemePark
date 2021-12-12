import { ReactiveController, ReactiveControllerHost } from "lit"
import { NordPolarNight } from "Themes/NordPolarNight.js"
import { NordSnowStorm } from "Themes/NordSnowStorm.js"
import { ShoelaceDark } from "Themes/ShoelaceDark.js"
import { ShoelaceLight } from "Themes/ShoelaceLight.js"
import { ThemeColoursToCss, ThemeToCss } from "Themes/Lib/DesignTokens.js"
import { TokenizeAll } from "Themes/Platform_Targets/Shoelace.js"

export enum ThemeMode { Dark=1, Light=2 }
const MEDIA_PREF_LIGHT = window.matchMedia("(prefers-color-scheme: light)")
const THEMES_DARK = [
	ShoelaceDark(),
	NordPolarNight(),
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
const loadThemeColours = (colours: ThemeColours, themeName: string) => {
	const tokens = TokenizeAll(colours)
	const id = themeName + "-colours"
	$(document, `style#${id}`)?.remove()
	const style = createStyle(id, ThemeColoursToCss(tokens).cssText)
	$(document, "head").appendChild(style)
}
const loadStyleTag = (theme: ThemeSpecification) => {
	loadThemeColours(theme.TokensColourTheme, theme.CssName)
	const style = createStyle(theme.CssName, ThemeToCss(theme).cssText)
	$(document, `style#${theme.CssName}`)?.remove()
	$(document, "head").appendChild(style)
	$(document, "body").className = theme.CssName
}

const state = (() => {
	const getVal = (k: string) => localStorage.getItem("theme-park-" + k)
	const mode = getVal("mode")
	const isLight = mode === null ? MEDIA_PREF_LIGHT.matches : mode === "light"
	return {
		Dark: THEMES_DARK.find(t => t.CssName === getVal("dark")) ?? THEMES_DARK[0],
		Light: THEMES_LIGHT.find(t => t.CssName === getVal("light")) ?? THEMES_LIGHT[0],
		Mode: isLight ? ThemeMode.Light : ThemeMode.Dark,
	}
})()

const applyCurrentTheme = () => {
	const store = (k: string, v: string) => localStorage.setItem("theme-park-" + k, v)
	store("dark", state.Dark.CssName)
	store("light", state.Light.CssName)
	store("mode", state.Mode === ThemeMode.Light ? "light" : "dark")

	const t = state.Mode === ThemeMode.Light ? state.Light : state.Dark
	loadStyleTag(t)
	hosts.forEach(h => h.requestUpdate())
}
MEDIA_PREF_LIGHT.addEventListener("change", () => {
	state.Mode = MEDIA_PREF_LIGHT.matches ? ThemeMode.Light : ThemeMode.Dark
	applyCurrentTheme()
})

let hosts: ReactiveControllerHost[] = []
applyCurrentTheme()

export class ThemeProvider implements ReactiveController {
	constructor(private host: ReactiveControllerHost) {
		host.addController(this) }
	hostConnected() {
		hosts.push(this.host) }
	hostDisconnected() {
		hosts = hosts.filter(h => h !== this.host) }

	GetMode() { return state.Mode }
	GetTheme() {
		return state.Mode === ThemeMode.Light ? state.Light : state.Dark }
	GetThemeOptions() {
		return state.Mode === ThemeMode.Light ? THEMES_LIGHT : THEMES_DARK }

	SetMode(m: ThemeMode) {
		state.Mode = m
		applyCurrentTheme() }
	SetTheme(o: ThemeSpecification) {
		if (o.IsLight) { state.Light = o }
		else           { state.Dark  = o }
		applyCurrentTheme() }
	// More performant than resetting the entire theme
	UpdateTheme() {
		const theme = this.GetTheme()
		loadThemeColours(theme.TokensColourTheme, theme.CssName)
	}
}
