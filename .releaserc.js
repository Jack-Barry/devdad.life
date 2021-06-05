const defaultRules = require('@semantic-release/commit-analyzer/lib/default-release-rules')

module.exports = {
  branches: [
    'master',
    { name: 'beta', prerelease: true },
    { name: 'hotfix', prerelease: true }
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    ['@semantic-release/npm', { npmPublish: false }],
    '@semantic-release/git'
  ],
  preset: 'conventionalcommits',
  releaseRules: [
    ...defaultRules,
    // Listed in the order they appear under cz-emoji/lib/types.json
    { type: 'perf', release: 'patch' },
    { type: 'quickfix', release: 'patch' },
    { type: 'feature', release: 'minor' },
    { type: 'ui', release: 'patch' },
    { type: 'init', release: 'major' },
    { type: 'security', release: 'patch' },
    { type: 'osx', release: 'patch' },
    { type: 'linux', release: 'patch' },
    { type: 'windows', release: 'patch' },
    { type: 'android', release: 'patch' },
    { type: 'ios', release: 'patch' },
    { type: 'downgrade', release: 'patch' },
    { type: 'upgrade', release: 'patch' },
    { type: 'analytics', release: 'patch' },
    { type: 'docker', release: 'patch' },
    { type: 'dep-add', release: 'patch' },
    { type: 'dep-rm', release: 'patch' },
    { type: 'i18n', release: 'patch' },
    { type: 'typo', release: 'patch' },
    { type: 'license', release: 'major' },
    { type: 'assets', release: 'patch' },
    { type: 'review', release: 'patch' },
    { type: 'access', release: 'patch' },
    { type: 'texts', release: 'patch' },
    { type: 'db', release: 'patch' },
    { type: 'log-add', release: 'patch' },
    { type: 'log-rm', release: 'patch' },
    { type: 'ux', release: 'patch' },
    { type: 'egg', release: 'patch' },
    { type: 'seo', release: 'patch' },
    { type: 'k8s', release: 'patch' },
    { type: 'seed', release: 'patch' },
    { type: 'animation', release: 'patch' }
  ]
}
