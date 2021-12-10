import * as chroma from "chroma.ts"
import { Interpolate } from "Themes/Lib/Colours.js"

const danger = (cs: chroma.Color[]) => ({
	"--sl-color-danger-50": cs[0],
	"--sl-color-danger-100": cs[1],
	"--sl-color-danger-200": cs[2],
	"--sl-color-danger-300": cs[3],
	"--sl-color-danger-400": cs[4],
	"--sl-color-danger-500": cs[5],
	"--sl-color-danger-600": cs[6],
	"--sl-color-danger-700": cs[7],
	"--sl-color-danger-800": cs[8],
	"--sl-color-danger-900": cs[9],
	"--sl-color-danger-950": cs[10],
})
export const StripDanger = (cs: chroma.Color[]) => danger(Interpolate(cs, 11))

const neutral = (cs: chroma.Color[]) => ({
	"--sl-color-neutral-0": cs[0],
	"--sl-color-neutral-50": cs[1],
	"--sl-color-neutral-100": cs[2],
	"--sl-color-neutral-200": cs[3],
	"--sl-color-neutral-300": cs[4],
	"--sl-color-neutral-400": cs[5],
	"--sl-color-neutral-500": cs[6],
	"--sl-color-neutral-600": cs[7],
	"--sl-color-neutral-700": cs[8],
	"--sl-color-neutral-800": cs[9],
	"--sl-color-neutral-900": cs[10],
	"--sl-color-neutral-950": cs[11],
	"--sl-color-neutral-1000": cs[12],
})
export const StripNeutral = (cs: chroma.Color[]) => neutral(Interpolate(cs, 13))

const primary = (cs: chroma.Color[]) => ({
	"--sl-color-primary-50": cs[0],
	"--sl-color-primary-100": cs[1],
	"--sl-color-primary-200": cs[2],
	"--sl-color-primary-300": cs[3],
	"--sl-color-primary-400": cs[4],
	"--sl-color-primary-500": cs[5],
	"--sl-color-primary-600": cs[6],
	"--sl-color-primary-700": cs[7],
	"--sl-color-primary-800": cs[8],
	"--sl-color-primary-900": cs[9],
	"--sl-color-primary-950": cs[10],
})
export const StripPrimary = (cs: chroma.Color[]) => primary(Interpolate(cs, 11))

const success = (cs: chroma.Color[]) => ({
	"--sl-color-success-50": cs[0],
	"--sl-color-success-100": cs[1],
	"--sl-color-success-200": cs[2],
	"--sl-color-success-300": cs[3],
	"--sl-color-success-400": cs[4],
	"--sl-color-success-500": cs[5],
	"--sl-color-success-600": cs[6],
	"--sl-color-success-700": cs[7],
	"--sl-color-success-800": cs[8],
	"--sl-color-success-900": cs[9],
	"--sl-color-success-950": cs[10],
})
export const StripSuccess = (cs: chroma.Color[]) => success(Interpolate(cs, 11))

const warning = (cs: chroma.Color[]) => ({
	"--sl-color-warning-50": cs[0],
	"--sl-color-warning-100": cs[1],
	"--sl-color-warning-200": cs[2],
	"--sl-color-warning-300": cs[3],
	"--sl-color-warning-400": cs[4],
	"--sl-color-warning-500": cs[5],
	"--sl-color-warning-600": cs[6],
	"--sl-color-warning-700": cs[7],
	"--sl-color-warning-800": cs[8],
	"--sl-color-warning-900": cs[9],
	"--sl-color-warning-950": cs[10],
})
export const StripWarning = (cs: chroma.Color[]) => warning(Interpolate(cs, 11))
