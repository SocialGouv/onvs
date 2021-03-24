const webpack = require("webpack")
const withPlugins = require("next-compose-plugins")
const withSourceMaps = require("@zeit/next-source-maps")

// const withTM = require("next-transpile-modules")([
//   "little-state-machine-devtools",
// ])

const nextConfig = {
  env: {
    TEST_CURRENT_DATE: process.env.TEST_CURRENT_DATE,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client. Needs getInitialProps on page to be available
  },
  serverRuntimeConfig: {
    // Will only be available on the server side. Needs getInitialProps on page to be available
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

module.exports = withPlugins([[withSourceMaps]], nextConfig)
