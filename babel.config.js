module.exports = {
  "presets": [
    [
      "@babel/preset-env", {
        "useBuiltIns": "entry",
        "corejs": 3,
        "modules": "auto"
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties"
  ],
  "env": {
    "test": {
      "plugins": [
        "istanbul"
      ]
    }
  }
}
