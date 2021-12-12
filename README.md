## Theme Park
Apps document themes through a set of Design Tokens, typically CSS Custom Properties or JSON key-value pairs. Applying third party themes requires sharing tokens, but each design system uses different tokens.

Existing theme specification systems like [Style Dictionary](https://amzn.github.io/style-dictionary/) and [Theo](https://github.com/salesforce-ux/theo) define all the styling for apps, including sizing and spacing. That's because they're not meant for 3rd party replacement, and overriding stylesheets with 3rd party themes can [break apps](https://stopthemingmy.app/).

## Goal
Bring **[all the themes](#themes-first-pass)** to the web, bridging the gap between theme creators and app authors.

## Objectives
Provide a huge variety of themes to apps:
1. Define a theme format algorithmically mappable to multiple platforms.
2. Provide a GUI to theme designers for specifying themes.
3. Compile themes to CSS for [Shoelace](https://github.com/shoelace-style/shoelace).
4. Implement **[all the themes](#themes-first-pass)**.

App developers will eventually need a portable theme-picker element, complete with code splitting and persistence. Fonts and icons are not in scope for Theme Park. The web already has fantastic support for including 3rd party fonts and icons in your apps.

## Constraints
Some themes have complex backgrounds, such as SVG images or gradients. The API should use a [DDD](https://fsharpforfunandprofit.com/ddd/) type system to prevent broken results like `color: transparent;` without a corresponding `background-clip: text;`.

Shoelace requires more colour shades than themes supply as tokens, which requires interpolating colours. Theme Park uses Chroma.ts to [interpolate colours in LCH](https://lea.verou.me/2020/04/lch-colors-in-css-what-why-and-how/#2-lch-and-lab-is-perceptually-uniform), and then uses code adapted from Color.js to map the result to sRGB colour space.

Theme Park generates themes on-the-fly, but downstream apps will need pre-generated themes and a theme-picker element that code-splits them.

## Building
Some assets require a one-time copy to the web root:
1. The Shoelace package 'assets' directory, which contains Bootstrap icons
2. Themes/Platform_Targets/shoelace-tokens.css

Back end coming soon.

### TODO
- Finish implementing real-time theme editing.
- Add Hex and RGB support.
- Add new part tokens for advanced theming, such as card background SVGs.
- Add many components to test theming.
- Map remaining colours for Nord themes.
- Export themes from GUI (both CSS and raw specification)

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
