const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

module.exports = withNextra({
  redirects: async () => {
    return [
      {
        source: '/:path*',
        destination: 'https://schedule-x.dev/premium',
        permanent: true,
      },
    ]
  }
})
