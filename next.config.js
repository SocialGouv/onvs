const webpack = require("webpack")
const withPlugins = require("next-compose-plugins")
const withSourceMaps = require("@zeit/next-source-maps")
const withTM = require("next-transpile-modules")([
  "little-state-machine-devtools",
])

// module.exports = nextSourceMaps({
//   env: {
//     SENTRY_DSN: process.env.SENTRY_DSN,
//     MATOMO_SITE_ID: process.env.MATOMO_SITE_ID,
//     MATOMO_URL: process.env.MATOMO_URL,
//   },
//   webpack: (config, { isServer, buildId }) => {
//     config.plugins.push(
//       new webpack.DefinePlugin({
//         // looks like it doesnt work for some reason
//         "process.env.SENTRY_RELEASE": JSON.stringify(buildId),
//       }),
//     )

//     if (!isServer) {
//       config.resolve.alias["@sentry/node"] = "@sentry/browser"
//     }

//     return config
//   },
// })

const nextConfig = {
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN,
    MATOMO_SITE_ID: process.env.MATOMO_SITE_ID,
    MATOMO_URL: process.env.MATOMO_URL,
  },
  webpack: (config, { isServer, buildId }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        // looks like it doesnt work for some reason
        "process.env.SENTRY_RELEASE": JSON.stringify(buildId),
      }),
    )

    if (!isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser"
    }

    return config
  },
}

module.exports = withPlugins([[withSourceMaps], [withTM]], nextConfig)
