import env from "@kosko/env"
import { ok } from "assert"
import { create } from "@socialgouv/kosko-charts/components/app"

const manifests = create("app", {
  env,
  config: { containerPort: 3000, withPostgres: true },
  deployment: {
    container: {
      resources: {
        requests: {
          cpu: "50m",
          memory: "128Mi",
        },
        limits: {
          cpu: "200m",
          memory: "256Mi",
        },
      },
    },
  },
})

export default manifests
