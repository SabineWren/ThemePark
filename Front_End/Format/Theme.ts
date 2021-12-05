import { ReactiveController, ReactiveControllerHost } from "lit"

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

const loadStylesheet = (theme: optionDark | optionLight) => {
	const url = `/${theme.File}.css`
	return document.querySelector(`link[href="${url}"]`)
		? Promise.resolve()
		: new Promise(resolve => {
			const link = document.createElement('link')
			link.rel = "stylesheet"
			link.href = url
			$(document, "head").appendChild(link)
			link.onload = resolve
		})
}

const MEDIA_PREF_LIGHT = window.matchMedia("(prefers-color-scheme: light)")
export enum ThemeMode { Dark=1, Light=2 }
const state = {
	Dark: THEMES_DARK[0] as optionDark,
	Light: THEMES_LIGHT[0] as optionLight,
	Mode: MEDIA_PREF_LIGHT.matches ? ThemeMode.Light : ThemeMode.Dark,
}
let hosts: ReactiveControllerHost[] = []
const applyCurrentTheme = () => {
	const t = state.Mode === ThemeMode.Light ? state.Light : state.Dark
	loadStylesheet(t).then(() => $(document, "body").className = t.SlClass)
	hosts.forEach(h => h.requestUpdate())
}
MEDIA_PREF_LIGHT.addEventListener("change", () => {
	state.Mode = MEDIA_PREF_LIGHT.matches ? ThemeMode.Light : ThemeMode.Dark
	applyCurrentTheme()
})

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
		const narrowLight = (t: optionDark | optionLight): t is optionLight =>
			THEMES_LIGHT.includes(t as optionLight)
		if (narrowLight(o)) {
			state.Light = o }
		else {
			state.Dark = o }
		applyCurrentTheme()
	}
}
