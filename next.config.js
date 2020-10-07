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
    TEST_CURRENT_DATE: process.env.TEST_CURRENT_DATE,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client. Needs getInitialProps on page to be available
    MATOMO_SITE_ID: process.env.MATOMO_SITE_ID,
    MATOMO_URL: process.env.MATOMO_URL,
    SENTRY_DSN: process.env.SENTRY_DSN,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side. Needs getInitialProps on page to be available
    DATABASE_URL: process.env.DATABASE_URL,
    POSTGRES_SSL: process.env.POSTGRES_SSL,
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
