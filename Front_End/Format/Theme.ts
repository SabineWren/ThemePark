import { ReactiveController, ReactiveControllerHost } from "lit"
import { NordPolarNight } from "Themes/NordPolarNight.js"
import { ShoelaceDark } from "Themes/ShoelaceDark.js"
import { ShoelaceLight } from "Themes/ShoelaceLight.js"
import { ThemeToCss } from "Themes/Tools/Lib.js"

const nordDark = NordPolarNight("sl-theme-nord-polar-night")
const shoelaceDark = ShoelaceDark("sl-theme-dark")
const shoelaceLight = ShoelaceLight("sl-theme-light")

const THEMES_DARK = [
	{ Spec: shoelaceDark, Style: ThemeToCss(shoelaceDark) },
	{ Spec: nordDark, Style: ThemeToCss(nordDark) },
] as const
// "sl-theme-light" "Nord Snow Storm"
const THEMES_LIGHT = [
	{ Spec: shoelaceLight, Style: ThemeToCss(shoelaceLight) },
	{ Spec: nordDark, Style: ThemeToCss(nordDark) },
] as const
type optionDark = typeof THEMES_DARK[number]
type optionLight = typeof THEMES_LIGHT[number]
const MEDIA_PREF_LIGHT = window.matchMedia("(prefers-color-scheme: light)")
const STORAGE_KEY = "theme-park-preference"
export enum ThemeMode { Dark=1, Light=2 }
let hosts: ReactiveControllerHost[] = []

const loadStyles = (theme: optionDark | optionLight) => {
	return $(document, `style#${theme.Spec.CssName}`)
		? Promise.resolve()
		: new Promise(resolve => {
			const style = document.createElement("style")
			style.innerHTML = theme.Style.cssText
			$(document, "head").appendChild(style)
			resolve(null)
		})
}

const applyCurrentTheme = () => {
	const t = state.Mode === ThemeMode.Light ? state.Light : state.Dark
	localStorage.setItem(STORAGE_KEY, t.Spec.CssName)
	loadStyles(t).then(() => $(document, "body").className = t.Spec.CssName)
	hosts.forEach(h => h.requestUpdate())
}

const state = (() => {
	const savedPref = localStorage.getItem(STORAGE_KEY)
	const tDark = THEMES_DARK.find(t => t.Spec.CssName === savedPref)
	const tLight = THEMES_LIGHT.find(t => t.Spec.CssName === savedPref)
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
