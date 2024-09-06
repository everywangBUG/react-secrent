import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerAttributifyJsx
} from "unocss"

export default defineConfig({
  shortcuts: [],
  theme: {
    colors: {
      themecolor: "skyBlue"
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
  ],
  transformers: [
    transformerAttributifyJsx()
  ],
})
