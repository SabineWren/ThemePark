import { ReactiveController, ReactiveControllerHost } from "lit"
import { NordPolarNightBody, NordPolarNight } from "Themes/NordPolarNight.js"
import { ShoelaceTokensShared } from "Themes/Tools/Shoelace.js"
import { ThemeToCss } from "Themes/Tools/Lib.js"

const nordDarkCss = ThemeToCss(
	"sl-theme-polar-night",
	NordPolarNightBody,
	NordPolarNight,
	ShoelaceTokensShared)

const THEMES_DARK = [
	{ File: "sl-theme-dark", SlClass: "sl-theme-dark", Label: "Default" },
	{ File: "sl-theme-nord", SlClass: "sl-theme-polar-night", Label: "Nord: Polar Night" },
] as const
const THEMES_LIGHT = [
	{ File: "sl-theme-light", SlClass: "sl-theme-light", Label: "Default" },
	{ File: "sl-theme-nord", SlClass: "sl-theme-snow-storm", Label: "Nord: Snow Storm" },
] as const
type optionDark = typeof THEMES_DARK[number]
type optionLight = typeof THEMES_LIGHT[number]
const MEDIA_PREF_LIGHT = window.matchMedia("(prefers-color-scheme: light)")
const STORAGE_KEY = "theme-park-preference"
export enum ThemeMode { Dark=1, Light=2 }
let hosts: ReactiveControllerHost[] = []

const loadStylesheet = (theme: optionDark | optionLight) => {
	const url = `/${theme.File}.css`

	// temporay kludge while figuring out theme spec
	if (theme.SlClass === "sl-theme-polar-night") {
		if ($(document, `#kludge-style`)) return Promise.resolve()
		const style = document.createElement("style")
		style.innerHTML = nordDarkCss.cssText
		style.id = "kludge-style"
		$(document, "head").appendChild(style)
		return Promise.resolve()
	}

	return $(document, `link[href="${url}"]`)
		? Promise.resolve()
		: new Promise(resolve => {
			const link = document.createElement("link")
			link.rel = "stylesheet"
			link.href = url
			$(document, "head").appendChild(link)
			link.onload = resolve
		})
}

const applyCurrentTheme = () => {
	const t = state.Mode === ThemeMode.Light ? state.Light : state.Dark
	localStorage.setItem(STORAGE_KEY, t.SlClass)
	loadStylesheet(t).then(() => $(document, "body").className = t.SlClass)
	hosts.forEach(h => h.requestUpdate())
}

const state = (() => {
	const savedPref = localStorage.getItem(STORAGE_KEY)
	const tDark = THEMES_DARK.find(t => t.SlClass === savedPref)
	const tLight = THEMES_LIGHT.find(t => t.SlClass === savedPref)
	return {
		Dark: tDark ?? THEMES_DARK[0],
		Light: tLight ?? THEMES_LIGHT[0],
		Mode: tDark ? ThemeMode.Dark
		: tLight ? ThemeMode.Light
		: MEDIA_PREF_LIGHT.matches ? ThemeMode.Light
		: ThemeMode.Dark,
	}
})()
MEDIA_PREF_LIGHT.addEventListener("change", () => {
	state.Mode = MEDIA_PREF_LIGHT.matches ? ThemeMode.Light : ThemeMode.Dark
	applyCurrentTheme()
})
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
		state.Mode = m; applyCurrentTheme() }
	SetTheme(o: optionDark | optionLight) {
		const getIsLight = (t: optionDark | optionLight): t is optionLight =>
			THEMES_LIGHT.includes(t as optionLight)
		if (getIsLight(o)) {
			state.Light = o }
		else {
			state.Dark = o }
		applyCurrentTheme()
	}
}
