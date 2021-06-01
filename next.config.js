const webpack = require("webpack")
const withPlugins = require("next-compose-plugins")
const withSourceMaps = require("@zeit/next-source-maps")

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
})

const nextConfig = {
  env: {
    TEST_CURRENT_DATE: process.env.TEST_CURRENT_DATE,
  },
  // future: {
  //   webpack5: true,
  // },
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

module.exports = withPlugins(
  [
    [withSourceMaps],
    [
      withMDX,
      {
        pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
      },
    ],
  ],
  nextConfig,
)
