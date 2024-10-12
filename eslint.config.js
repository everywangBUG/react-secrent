import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx,js}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // tab键缩进两个空格
      "indent": ["error", 2],
      // 允许使用空对象类型
      "@typescript-eslint/no-empty-object-type": "off",
      // 允许使用未声明变量
      "@typescript-eslint/no-unused-expressions": "off",
      // 允许使用 any
      "@typescript-eslint/no-explicit-any": "off",
      // 使用双引号
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      // useEffect 依赖列表中不允许有未声明的变量
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/rules-of-hooks": "off",
      // 只使用双引号
      quotes: ["error", "double"],
      // 不使用分号结尾语句
      semi: ["warn", "never"],
    },
  },
)
