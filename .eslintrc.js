module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": [
    "@typescript-eslint"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sourceType": "module",
    "project": "./tsconfig.json",
    "ecmaFeatures": {
      "jsx": true,
    },
    "useJSXTextNode": true,
    "extraFileExtensions": [".ts", ".tsx", ".js", ".jsx", ".vue", ".json", ".node"],
  },
  "settings": {
    "node": {
      "tryExtensions": [".tsx", ".ts", ".jsx", ".js", ".json", ".node"]
    }
  },
  "rules": {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",

    "camelcase": "off",
    "@typescript-eslint/camelcase": "error",

    "@typescript-eslint/adjacent-overload-signatures": "error",
    "node/no-missing-import": "error",
  }
}
