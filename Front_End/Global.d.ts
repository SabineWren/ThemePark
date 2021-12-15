interface HTMLElement {
	shadowRoot: ShadowRoot
}
interface Node {
	getRootNode(options?: GetRootNodeOptions): ShadowRoot
}

// All global functions defined in Main.ts
declare function $<T = HTMLElement>(ele: ParentNode | HTMLElement, selector: string): T
declare function $$<T = HTMLElement>(ele: ParentNode | HTMLElement, selector: string): T[]

declare type SlAlert = import("@shoelace-style/shoelace/dist/shoelace.js").SlAlert
declare type SlAnimatedImage = import("@shoelace-style/shoelace/dist/shoelace.js").SlAnimatedImage
declare type SlAnimation = import("@shoelace-style/shoelace/dist/shoelace.js").SlAnimation
declare type SlAvatar = import("@shoelace-style/shoelace/dist/shoelace.js").SlAvatar
declare type SlBadge = import("@shoelace-style/shoelace/dist/shoelace.js").SlBadge
declare type SlBreadcrumb = import("@shoelace-style/shoelace/dist/shoelace.js").SlBreadcrumb
declare type SlBreadcrumbItem = import("@shoelace-style/shoelace/dist/shoelace.js").SlBreadcrumbItem
declare type SlButton = import("@shoelace-style/shoelace/dist/shoelace.js").SlButton
declare type SlButtonGroup = import("@shoelace-style/shoelace/dist/shoelace.js").SlButtonGroup
declare type SlCard = import("@shoelace-style/shoelace/dist/shoelace.js").SlCard
declare type SlCheckbox = import("@shoelace-style/shoelace/dist/shoelace.js").SlCheckbox
declare type SlColorPicker = import("@shoelace-style/shoelace/dist/shoelace.js").SlColorPicker
declare type SlDetails = import("@shoelace-style/shoelace/dist/shoelace.js").SlDetails
declare type SlDialog = import("@shoelace-style/shoelace/dist/shoelace.js").SlDialog
declare type SlDivider = import("@shoelace-style/shoelace/dist/shoelace.js").SlDivider
declare type SlDrawer = import("@shoelace-style/shoelace/dist/shoelace.js").SlDrawer
declare type SlDropdown = import("@shoelace-style/shoelace/dist/shoelace.js").SlDropdown
declare type SlForm = import("@shoelace-style/shoelace/dist/shoelace.js").SlForm
declare type SlFormatBytes = import("@shoelace-style/shoelace/dist/shoelace.js").SlFormatBytes
declare type SlFormatDate = import("@shoelace-style/shoelace/dist/shoelace.js").SlFormatDate
declare type SlFormatNumber = import("@shoelace-style/shoelace/dist/shoelace.js").SlFormatNumber
declare type SlIcon = import("@shoelace-style/shoelace/dist/shoelace.js").SlIcon
declare type SlIconButton = import("@shoelace-style/shoelace/dist/shoelace.js").SlIconButton
declare type SlImageComparer = import("@shoelace-style/shoelace/dist/shoelace.js").SlImageComparer
declare type SlInclude = import("@shoelace-style/shoelace/dist/shoelace.js").SlInclude
declare type SlInput = import("@shoelace-style/shoelace/dist/shoelace.js").SlInput
declare type SlMenu = import("@shoelace-style/shoelace/dist/shoelace.js").SlMenu
declare type SlMenuItem = import("@shoelace-style/shoelace/dist/shoelace.js").SlMenuItem
declare type SlMenuLabel = import("@shoelace-style/shoelace/dist/shoelace.js").SlMenuLabel
declare type SlMutationObserver = import("@shoelace-style/shoelace/dist/shoelace.js").SlMutationObserver
declare type SlProgressBar = import("@shoelace-style/shoelace/dist/shoelace.js").SlProgressBar
declare type SlProgressRing = import("@shoelace-style/shoelace/dist/shoelace.js").SlProgressRing
declare type SlQrCode = import("@shoelace-style/shoelace/dist/shoelace.js").SlQrCode
declare type SlRadio = import("@shoelace-style/shoelace/dist/shoelace.js").SlRadio
declare type SlRadioGroup = import("@shoelace-style/shoelace/dist/shoelace.js").SlRadioGroup
declare type SlRange = import("@shoelace-style/shoelace/dist/shoelace.js").SlRange
declare type SlRating = import("@shoelace-style/shoelace/dist/shoelace.js").SlRating
declare type SlRelativeTime = import("@shoelace-style/shoelace/dist/shoelace.js").SlRelativeTime
declare type SlResizeObserver = import("@shoelace-style/shoelace/dist/shoelace.js").SlResizeObserver
declare type SlResponsiveMedia = import("@shoelace-style/shoelace/dist/shoelace.js").SlResponsiveMedia
declare type SlSelect = import("@shoelace-style/shoelace/dist/shoelace.js").SlSelect
declare type SlSkeleton = import("@shoelace-style/shoelace/dist/shoelace.js").SlSkeleton
declare type SlSpinner = import("@shoelace-style/shoelace/dist/shoelace.js").SlSpinner
declare type SlSwitch = import("@shoelace-style/shoelace/dist/shoelace.js").SlSwitch
declare type SlTab = import("@shoelace-style/shoelace/dist/shoelace.js").SlTab
declare type SlTabGroup = import("@shoelace-style/shoelace/dist/shoelace.js").SlTabGroup
declare type SlTabPanel = import("@shoelace-style/shoelace/dist/shoelace.js").SlTabPanel
declare type SlTag = import("@shoelace-style/shoelace/dist/shoelace.js").SlTag
declare type SlTextarea = import("@shoelace-style/shoelace/dist/shoelace.js").SlTextarea
declare type SlTooltip = import("@shoelace-style/shoelace/dist/shoelace.js").SlTooltip
declare type SlVisuallyHidden = import("@shoelace-style/shoelace/dist/shoelace.js").SlVisuallyHidden
