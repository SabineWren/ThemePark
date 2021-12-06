## Theme Park
Apps document themes through a set of Design Tokens, typically CSS Custom Properties or JSON key-value pairs. Applying third party themes requires sharing tokens, but each design system uses different tokens.

Existing theme specification systems like [Style Dictionary](https://amzn.github.io/style-dictionary/) and [Theo](https://github.com/salesforce-ux/theo) define all the styling for apps, including sizing and spacing. That's because they're not meant for 3rd party replacement, and overriding stylesheets with 3rd party themes can [break apps](https://stopthemingmy.app/).

## Goal
Bring **[all the themes](#themes)** to the web, bridging the gap between theme creators and app authors.

## Objectives
My vision is for web apps to support a huge variety of themes by default:
1. Implement a runtime theme-picker component.
2. Create a type-safe API Specification for design tokens.
3. Implement **[all the themes](#themes)**.
4. Compile themes to CSS targeting [Shoelace](https://github.com/shoelace-style/shoelace).

Fonts and icons are not in scope for *Theme Park*. The web already has fantastic support for including 3rd party fonts and icons in your apps.

## Constraints
Some themes have complex requirements, such as gradients over card backgrounds or text colours. The API should use a [DDD](https://fsharpforfunandprofit.com/ddd/) type system to prevent broken results like `color: transparent;` without a corresponding `background-clip: text;`.

Shoelace requires more shades than any 3rd party theme specifies, which may require mapping individual colours to many shades automatically. That's a [hard problem](https://lea.verou.me/2020/04/lch-colors-in-css-what-why-and-how/#2-lch-and-lab-is-perceptually-uniform). Additionally, any change to a theme palette arguably changes it to a new theme. Some shade changes must be okay, because Nord uses non-specified colours on their own home page, such as #fff.

i.e. I need to programatically extend the shade count but minimize deviance from the colour palette. It might help to first convert theme colors to [LCH](https://css.land/lch/), then clamp them to RGB at build time. That would also future-proof the theme colours for eventual LCH browser support.

Themes add bytes, and I hope to eventually support a ludicrous number of themes. That requires code-splitting the CSS (already done in theme-picker code).

## Building
Shoelace requires a one-time copy of its Bootstrap icons. Copy the shoelace assets directory into Web_Root. Bring your own web server.

### TODO Mock Website
- Add many components to a mock site to test theming.
- Implement full support for Nord Polar Night, as it's the best-documented dark theme that also has a corresponding light theme.

### TODO Theme Tooling
I brought in Chroma and created lib functions wrapping it to minimize theme code.
1. Finish Nord Dark theme (mostly done).
2. Finish Nord Dark and re-implement defaults using TS.
3. Code-split themes out as JS bundles instead of css files.
4. Implement all the themes!

## Themes
Expect this list to grow.

#### GUI themes with good documentation.
1. [Nord](https://nordtheme.com) Polar Night (dim), Snow Storm (light)
2. [Dracula](https://draculatheme.com) Classic (dark)
3. [Dracula](https://draculatheme.com) Pro[^1] variants: Alucard[^2], Buffy, Blade, Lincoln, Morbius, Van Helsing

[^1]: The name may change for legal reasons when I start implementing it. Colours aren't copyrightable, and I haven't looked at any of their 'Pro' source code.
[^2]: Alucard is an unofficial variant of Dracula Pro with a different text-highlight colour.

#### Desktop themes
These don't seem to provide documentation for porting to other environments. However, each Linux distro has a bunch, and they're more suited to GUIs than IDE themes.

[Midnight](https://github.com/i-mint/midnight) GNOME theme with 12 accent colour variants

#### IDE themes
Unfortunately, most themes are built for text editors, and these require extensive design work to map the colour palettes to GUI components. Many are likely not suitable at all for GUI design (ex. [Ayu](https://github.com/dempfi/ayu), with orange text on white background).

[Tokyo Night](https://github.com/enkia/tokyo-night-vscode-theme) dark, dim, and light and [unofficial variant](https://github.com/huytd/vscode-tokyo-city) with reduced saturation

[Embark](https://embark-theme.github.io) is similar to Dracula, but the palette offers both saturated and pastel colours. Technically has a Firefox port, although I'm still classifying it as an IDE theme due to limited GUI examples.

[Solarized](https://ethanschoonover.com/solarized/#usage-development) grunge, dim

[Gruvbox](https://github.com/morhetz/gruvbox) dark, grunge

[Gruvbox Material](https://github.com/sainnhe/gruvbox-material) palette swap with reduced saturation: dark, grunge

[Gruvbox Srcery](https://srcery-colors.github.io/) palette swap with increased saturation: dark

[Pinkmare](https://github.com/Matsuuu/pinkmare) dark. Pastel hues of red/pink/purple

[Everforest](https://github.com/sainnhe/everforest) grunge, dim. Green pastel (see its inspirations as well)

[Miramare](https://github.com/franbach/miramare) merges Everforest with Gruvbox, and in turn inspired Pinkmare
