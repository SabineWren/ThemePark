import { NormalizedOutputOptions, Plugin } from "rollup"
import { promises as Fs, existsSync as FsSyncExists } from "fs"

export const PluginInjectHashIntoHtml = (
	htmlTemplatePath: string, distDir: string,
	scriptsNoExt: string[],
): Plugin => ({
	name: "plugin-inject-hash-into-html",
	writeBundle: async (_options: NormalizedOutputOptions, bundle: { [fileName: string]: any }) => {
		const bundleNames = Object.keys(bundle)
		const inject = (script: string) =>
			injectHash(htmlTemplatePath, distDir, bundleNames, script)
		await Promise.all(scriptsNoExt.map(inject))
	},
})
const injectHash = async (
	htmlTemplatePath: string, distDir: string,
	bundleNames: string[], scriptNoExt: string,
) => {
	const pathHtml = distDir + "index.html"
	// This forces matching case
	const bundleName = bundleNames.find(n => n.includes(scriptNoExt))
	if (!bundleName) {
		throw new Error(`Can't find script [${scriptNoExt}]. Found these instead: ${bundleNames.join(", ")}`)
	}
	const html = FsSyncExists(pathHtml)
		? await Fs.readFile(pathHtml, "utf8")
		: await Fs.readFile(htmlTemplatePath, "utf8")
	// building a regex from a string requires escaping backslashes
	const matchSrc = new RegExp(scriptNoExt + "\\.[a-fA-F0-9]+\\.js")
	if (html.match(matchSrc) === null) { console.error("Missing html tag", scriptNoExt) }
	const xformed = html.replace(matchSrc, bundleName)
	return Fs.writeFile(pathHtml, xformed, { flag: "w" })
}
