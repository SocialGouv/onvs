import env from "@kosko/env"

import { create } from "@socialgouv/kosko-charts/components/app"
import { addPostgresUserSecret } from "@socialgouv/kosko-charts/utils/addPostgresUserSecret"

const manifests = create("app", {
  env,
  config: { containerPort: 3000 },
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

// DEV: add secret to access DB
const hasuraDeployment = manifests.find(
  (manifest): manifest is Deployment => manifest.kind === "Deployment",
)
ok(hasuraDeployment)

addPostgresUserSecret(hasuraDeployment)

export default manifests
