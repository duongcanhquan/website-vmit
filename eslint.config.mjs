import type { Config } from "eslint/config"

const eslintConfig: Config = [
  {
    ignores: [".next/**", "node_modules/**"],
  },
]

export default eslintConfig
