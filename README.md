<p align="center">
 <h1 align="center">
  Tailwind Broken Border
 </h1>
</p>

## About
This plugin was made because it was needed for a personal project and I had the idea to port it to an npm package and to have a few more features for myself that I was missing. Overall it's a pretty simple plugin with a few caveats due to tailwinds plugin api.


## Instalation

First install the plugin from npm:

```shell
npm i tw-broken-border
```

Then add the plugin to your tailwind.config.js

```js
import forms from '@tailwindcss/forms';
//Add the broken border plugin:
import brokenBorder from 'tw-broken-border';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {}
  },
  // Add the plugin to the plugin array
  plugins: [forms, brokenBorder]
};
```

## Usage

After adding the plugin you can freely use it as such: 

```html
<div class="broken-blue-500 w-full px-4 flex flex-col gap-2">
  <div class="w-full py-4 broken-b-blue-400-sm/sm">
    <h2 class="text-center">Broken Borders are very cool</h2>
  </div>
  <div class="p-4 text-foreground-700">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, quos! Minima, obcaecati? Deleniti, non velit deserunt fugit recusandae veritatis aspernatur!
  </div>
</div>
```

## General info

The plugin provides utils for generating broken borders with adjustable sides, lengths, gaps, colors. The width has to be controlled from the theme: 

```html
    <div class="broken-<side>-<color>-<length>/gap">broken border</div>
```

The sides provided are:

| Prefix          | Side                |
|-----------------|---------------------|
| `t`             | top                 |
| `b`             | bottom              |
| `r`             | right               |
| `l`             | left                |
| `xb`            | left-right-bottom   |
| `xt`            | left-right-top      |
| `yr`            | top-bottom-right    |
| `yl`            | top-bottom-left     |
| *(no modifier)* | all sides           |

The default length values provided by the plugin are:

```js
      brokenLength: {
        DEFAULT: "21px",
        sm: "15px",
        md: "27px",
        lg: "32px",
        xl: "40px",
      },
```

## Caveats and Limitations

Due to the fact that CSS doesn't provide control over dashed or dotter border styles,
they have to be created by using backround-image properties which looks something like this:

```css
.example-broken-top {
    background-image: repeating-linear-gradient(90deg, COLOR, COLOR LENGTH, transparent LENGTH, transparent calc(GAP + LENGTH));
    background-position: left top;
    background-repeat: repeat-x;
    background-size: 100% WIDTH;
}
```

Due to this fact, only the length property in the class supports arbitrary values, because color is matched statically
from your provided theme. The gap is provided as a modifier due to limitations by the matchUtilities function from Tailwind plugin api.

So you can't do something like this: 

```html
<div class="broken-t-[#be123c]-sm/[40px]"></div>
```
Because neither the color nor the modifier are dynamic, you can use arbitrary values for the length property: 

```html
<div class="broken-t-rose-700-[12px]/lg"></div>
```
The solution if you want to have different colors, gaps and widths is to extend the theme in your tailwind.config.(js/ts):

```js
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      // Any values added to the color theme will be used by the plugin when generating static color classes
      colors: {
        primary: {
            DEFAULT: "#be185d",
            foreground: "#fce7f3"
        }
      },
      // The length values can be adjusted by extending the theme called brokenLength
      brokenLength: {
        "2xl": "46px"
      },
      // The gap values used in the modifier can also be adjusted from the theme:
      brokenGap: {
        "2xl": "36px",

      },
      //Currently there's no controllable width, so broken borders will all have the same width, you can adjust it from the theme as well:
      brokenWidth: "4px"
  },
```


