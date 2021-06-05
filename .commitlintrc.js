const commitTypes = require('cz-emoji/lib/types.json')

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', commitTypes.map((type) => type.name)],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^((?:\w|-)*)(?:\((.*)\))?!?: (.*)$/,
      breakingHeaderPattern: /^((?:\w|-)*)(?:\((.*)\))?!: (.*)$/,
    },
  },
}
