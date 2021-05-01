import env from "@kosko/env"
import { create } from "@socialgouv/kosko-charts/components/app"
import { getHarborImagePath } from "@socialgouv/kosko-charts/utils"

const manifests = create("app", {
  env,
  config: {
    containerPort: 3000,
    withPostgres: true,
    image: getHarborImagePath({ name: "onvs-app" }),
  },
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
