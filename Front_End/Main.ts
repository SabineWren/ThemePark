import "@shoelace-style/shoelace/dist/components/button/button.js"
import "@shoelace-style/shoelace/dist/components/button-group/button-group.js"
import "@shoelace-style/shoelace/dist/components/card/card.js"
import "@shoelace-style/shoelace/dist/components/color-picker/color-picker.js"
import "@shoelace-style/shoelace/dist/components/dropdown/dropdown.js"
import "@shoelace-style/shoelace/dist/components/icon/icon.js"
// import "@shoelace-style/shoelace/dist/components/icon-button/icon-button.js"
// import "@shoelace-style/shoelace/dist/components/input/input.js"
import "@shoelace-style/shoelace/dist/components/menu/menu.js"
import "@shoelace-style/shoelace/dist/components/menu-item/menu-item.js"
import "@shoelace-style/shoelace/dist/components/switch/switch.js"
import "@shoelace-style/shoelace/dist/components/tab/tab.js"
import "@shoelace-style/shoelace/dist/components/tab-group/tab-group.js"
import "@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js"
import "@shoelace-style/shoelace/dist/components/tag/tag.js"
// import "@shoelace-style/shoelace/dist/components/textarea/textarea.js"
import "@shoelace-style/shoelace/dist/components/tooltip/tooltip.js"
import { registerIconLibrary } from "@shoelace-style/shoelace/dist/utilities/icon-library.js"
import "Elements/App-Root.js"
import "Elements/Theme-Picker.js"
import "Front_End/Elements/Theme-Editor/ModeButtons.js"
import "Front_End/Elements/Theme-Editor/Tab-Colour-Editor.js"
import "Front_End/Elements/Theme-Editor/Tab-Colour-Editor-Group.js"
import "Front_End/Elements/Theme-Editor/Theme-Exporter.js"

registerIconLibrary("custom", {
	resolver: name => `/assets/custom/${name}.svg`,
	mutator: svg => svg.setAttribute("fill", "currentColor"),
})
