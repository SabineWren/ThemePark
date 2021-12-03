import "@shoelace-style/shoelace/dist/components/button/button.js"
import "@shoelace-style/shoelace/dist/components/button-group/button-group.js"
import "@shoelace-style/shoelace/dist/components/dropdown/dropdown.js"
import "@shoelace-style/shoelace/dist/components/icon/icon.js"
import "@shoelace-style/shoelace/dist/components/menu/menu.js"
import "@shoelace-style/shoelace/dist/components/menu-item/menu-item.js"
import "@shoelace-style/shoelace/dist/components/switch/switch.js"
import { AppRoot } from "Elements/App-Root.js"
import { SelectTheme } from "Elements/Select-Theme.js"

customElements.define("app-root", AppRoot)
customElements.define("select-theme", SelectTheme)

const getRoot = (ele: ParentNode | HTMLElement) =>
	(ele as HTMLElement).shadowRoot ?? ele
window.$ = <T extends HTMLElement>(ele: ParentNode | HTMLElement, selector: string) =>
	getRoot(ele).querySelector<T>(selector)!
window.$$ = <T extends HTMLElement>(ele: ParentNode | HTMLElement, selector: string) =>
	Array.from(getRoot(ele).querySelectorAll<T>(selector)!)
