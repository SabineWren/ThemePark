## Theme Park
Apps document themes through a set of Design Tokens, typically CSS Custom Properties or JSON key-value pairs. Applying third party themes requires sharing tokens, but each design system uses different tokens.

Existing theme specification systems like [Style Dictionary](https://amzn.github.io/style-dictionary/) and [Theo](https://github.com/salesforce-ux/theo) define all the styling for apps, including sizing and spacing. That's because they're not meant for 3rd party replacement, and overriding stylesheets with 3rd party themes can [break apps](https://stopthemingmy.app/).

## Goal
Bring **[all the themes](#themes-first-pass)** to the web, bridging the gap between theme creators and app authors.

## Objectives
Provide a huge variety of themes to apps:
1. Implement a runtime theme-picker component.
2. Create a type-safe Theme API Specification and a GUI for implementing them.
3. Implement **[all the themes](#themes-first-pass)**.
4. Compile themes to CSS for [Shoelace](https://github.com/shoelace-style/shoelace).

Fonts and icons are not in scope for *Theme Park*. The web already has fantastic support for including 3rd party fonts and icons in your apps.

## Constraints
Some themes have complex requirements, such as gradients over card backgrounds or text colours. The API should use a [DDD](https://fsharpforfunandprofit.com/ddd/) type system to prevent broken results like `color: transparent;` without a corresponding `background-clip: text;`.

Shoelace requires more shades than any 3rd party theme specifies, which requires interpolating colours. Any change to a theme palette arguably changes it to a new theme. Some shade changes must be okay, because Nord uses non-specified colours on their own home page, such as #fff.

[Colour interpolation](https://lea.verou.me/2020/04/lch-colors-in-css-what-why-and-how/#2-lch-and-lab-is-perceptually-uniform) is surprisingly hard. Chroma.js doesn't correctly map from LCH to sRGB, while Color.js doesn't interpolate ranges.

Themes are already code-split, but require JS to load and generate the theme, which won't be viable for production apps.

## Building
Shoelace requires a one-time copy of its Bootstrap icons, so copy the shoelace assets directory into Web_Root. Bring your own web server.

### TODO Mock Website
- Add colour pickers for real-time theme editing.
- Add Hex and RGB support.
- Add many components to test theming.

### TODO Theme Tooling
- Improve colour interpolation, and make it GUI-driven using colour pickers.
- Map remaining colours for Nord themes and re-style elements such as cards.
- Implement all the themes!

### Themes First Pass
1. [Nord](https://nordtheme.com) Polar Night (dim), Snow Storm (light)
2. Vampire (dark) variants: purple, pink, cyan, yellow, red, black

#### Possible Future Themes
[Midnight](https://github.com/i-mint/midnight) GNOME theme with 12 accent colour variants

[Tokyo Night](https://github.com/enkia/tokyo-night-vscode-theme) dark, dim, and light and [unofficial variant](https://github.com/huytd/vscode-tokyo-city) with reduced saturation

[Embark](https://embark-theme.github.io) is similar to Dracula, but the palette offers both saturated and pastel colours. Technically has a Firefox port, although I'm still classifying it as an IDE theme due to limited GUI examples.

[Solarized](https://ethanschoonover.com/solarized/#usage-development) grunge, dim

[Gruvbox](https://github.com/morhetz/gruvbox) dark, grunge

[Gruvbox Material](https://github.com/sainnhe/gruvbox-material) palette swap with reduced saturation: dark, grunge

[Gruvbox Srcery](https://srcery-colors.github.io/) palette swap with increased saturation: dark

[Pinkmare](https://github.com/Matsuuu/pinkmare) dark. Pastel hues of red/pink/purple

[Everforest](https://github.com/sainnhe/everforest) grunge, dim. Green pastel (see its inspirations as well)

[Miramare](https://github.com/franbach/miramare) merges Everforest with Gruvbox, and in turn inspired Pinkmare
