import getConfig from "next/config"

const { publicRuntimeConfig } = getConfig() || {}

export const API_URL =
  publicRuntimeConfig?.API_URL || "http://localhost:3030/api"
