import "@shoelace-style/shoelace/dist/components/button/button.js"
import "@shoelace-style/shoelace/dist/components/button-group/button-group.js"
import "@shoelace-style/shoelace/dist/components/color-picker/color-picker.js"
import "@shoelace-style/shoelace/dist/components/dropdown/dropdown.js"
import "@shoelace-style/shoelace/dist/components/icon/icon.js"
// import "@shoelace-style/shoelace/dist/components/icon-button/icon-button.js"
// import "@shoelace-style/shoelace/dist/components/input/input.js"
import "@shoelace-style/shoelace/dist/components/menu/menu.js"
import "@shoelace-style/shoelace/dist/components/menu-item/menu-item.js"
import "@shoelace-style/shoelace/dist/components/menu-label/menu-label.js"
import "@shoelace-style/shoelace/dist/components/switch/switch.js"
import "@shoelace-style/shoelace/dist/components/tab/tab.js"
import "@shoelace-style/shoelace/dist/components/tab-group/tab-group.js"
import "@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js"
import "@shoelace-style/shoelace/dist/components/tag/tag.js"
// import "@shoelace-style/shoelace/dist/components/textarea/textarea.js"
import "@shoelace-style/shoelace/dist/components/tooltip/tooltip.js"
import { registerIconLibrary } from "@shoelace-style/shoelace/dist/utilities/icon-library.js"
import "Elements/App-Root.js"
import "Elements/Card-Group.js"
import "Elements/Color/ModeButtons.js"
import "Elements/Color/Tab-Color-Editor.js"
import "Elements/Color/Tab-Color-Editor-Group.js"
import "Elements/Gradients/Select-Gradient.js"
import "Elements/Shoelace/Card.js"
import "Elements/Shoelace/Divider.js"
import "Elements/Shoelace/Menu-Header.js"
import "Elements/Top_Bar/Theme-Exporter.js"
import "Elements/Top_Bar/Theme-Picker.js"
import "Elements/Top_Bar/Top-Bar.js"

// svg => svg.setAttribute("fill", "currentColor")
// TODO link to theme.
const applyGradientFill = (svg: SVGElement) => {
	const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs")
	defs.innerHTML = `
<linearGradient id="global-svg-gradient"
	x1="0%" y1="0%" x2="100%" y2="100%">
	<stop offset="0%" stop-color="var(--icon-gradient-start)" />
	<stop offset="100%" stop-color="var(--icon-gradient-end)" />
</linearGradient>`
	svg.prepend(defs)
	svg.setAttribute("fill", "var(--icon-fill)")
}

const regIconLib = (libName: string, dirName: string) =>
	registerIconLibrary(libName, {
		resolver: name => `/assets/${dirName}/${name}.svg`,
		mutator: applyGradientFill,
	})
regIconLib("custom", "custom")
regIconLib("fa", "fa")
regIconLib("default", "icons")
