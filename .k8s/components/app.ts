import env from "@kosko/env"
import { ok } from "assert"
import { EnvVar } from "kubernetes-models/v1/EnvVar"
import { addEnv } from "@socialgouv/kosko-charts/utils/addEnv"
import { create } from "@socialgouv/kosko-charts/components/app"
import { Deployment } from "kubernetes-models/apps/v1/Deployment"
import { getIngressHost } from "@socialgouv/kosko-charts/utils/getIngressHost"
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
const appDeployment = manifests.find(
  (manifest): manifest is Deployment => manifest.kind === "Deployment",
)
ok(appDeployment)

const apiUrl = new EnvVar({
  name: "API_URL",
  value: `https://${getIngressHost(manifests)}/api`,
})

addEnv({ deployment: appDeployment, data: apiUrl })

addPostgresUserSecret(appDeployment)

export default manifests
