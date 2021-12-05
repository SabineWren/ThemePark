import "@shoelace-style/shoelace/dist/components/button/button.js"
import "@shoelace-style/shoelace/dist/components/card/card.js"
import "@shoelace-style/shoelace/dist/components/dropdown/dropdown.js"
import "@shoelace-style/shoelace/dist/components/icon/icon.js"
import "@shoelace-style/shoelace/dist/components/menu/menu.js"
import "@shoelace-style/shoelace/dist/components/menu-item/menu-item.js"
import "@shoelace-style/shoelace/dist/components/switch/switch.js"
import { registerIconLibrary } from "@shoelace-style/shoelace/dist/utilities/icon-library.js"
import { AppRoot } from "Elements/App-Root.js"
import { CurrencyPicker } from "Elements/Currency-Picker.js"
import { ThemePickerDropdown, ThemePickerSwitch } from "Elements/Theme-Picker.js"

registerIconLibrary("custom-icons", {
	resolver: name => `/images/${name}.svg`,
	mutator: svg => svg.setAttribute("fill", "currentColor"),
})

customElements.define("app-root", AppRoot)
customElements.define("currency-picker", CurrencyPicker)
customElements.define("theme-picker-dropdown", ThemePickerDropdown)
customElements.define("theme-picker-switch", ThemePickerSwitch)
