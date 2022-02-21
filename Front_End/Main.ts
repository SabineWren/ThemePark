import "@shoelace-style/shoelace/dist/components/button/button.js"
import "@shoelace-style/shoelace/dist/components/button-group/button-group.js"
import "@shoelace-style/shoelace/dist/components/card/card.js"
import "@shoelace-style/shoelace/dist/components/color-picker/color-picker.js"
import "@shoelace-style/shoelace/dist/components/divider/divider.js"
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
import "Elements/Colour/ModeButtons.js"
import "Elements/Colour/Tab-Colour-Editor.js"
import "Elements/Colour/Tab-Colour-Editor-Group.js"
import "Elements/Gradients/Select-Gradient.js"
import "Elements/Top_Bar/Theme-Exporter.js"
import "Elements/Top_Bar/Theme-Picker.js"
import "Elements/Top_Bar/Top-Bar.js"
import "Elements/UI/Gradient-Divider.js"
import "Elements/UI/Menu-Header.js"

// svg => svg.setAttribute("fill", "currentColor")
// TODO link to theme.
const applyGradientFill = (svg: SVGElement) => {
	const defs = document.createElementNS("http://www.w3.org/2000/svg", "svg")
	defs.innerHTML = `
<svg style="width:0;height:0;position:absolute;" aria-hidden="true" focusable="false">
  <linearGradient id="global-svg-gradient" x2="1" y2="1">
    <stop offset="0%" stop-color="var(--hsl-start)" />
    <stop offset="100%" stop-color="var(--hsl-end)" />
  </linearGradient>
</svg>`
	svg.prepend(defs)
	svg.setAttribute("fill", "var(--svg-fill)")
}

const regIconLib = (dir: string, libName: string) => registerIconLibrary(libName, {
	resolver: name => `/assets/${dir}/${name}.svg`,
	mutator: applyGradientFill })
regIconLib("custom", "custom")
regIconLib("fa", "fa")
regIconLib("icons", "default")
regIconLib("icons", "system")
