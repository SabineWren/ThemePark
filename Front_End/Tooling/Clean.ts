import { InputOptions, Plugin } from "rollup"
import { promises as Fs, existsSync as FsSyncExists } from "fs"

export const PluginCleanOldFiles = (distDir: string, scriptNoExt: string): Plugin => ({
	name: "plugin-clean-old-file",
	buildStart: (_options: InputOptions) => cleanDirectory(distDir, scriptNoExt),
})
const cleanDirectory = async (dir: string, scriptNameNoExt: string) => {
	if (!FsSyncExists(dir)) { return }
	const files = await Fs.readdir(dir)
	const deletions = files
		.filter(f => scriptNameNoExt === undefined || f.includes(scriptNameNoExt))
		.filter(f => FsSyncExists(f))
		.map(f => Fs.unlink(dir + f))
	await Promise.all(deletions)
}

const getIsUnsafeDelete = (dir: string) =>
	dir.toLowerCase().match(/^web_root\/dist.*/) === null
const toError = (dir: string) =>
	`Possible accidental deletion. Output directories start with 'dist' or 'assets'. You entered ${dir}.`
export const RmDirSync = (dir: string) => {
	if (getIsUnsafeDelete(dir)) { return console.error(toError(dir)) }
	if (!FsSyncExists(dir)) { return }
	Fs.rm(dir, { recursive: true })
}
