import env from "@kosko/env"
import { ok } from "assert"
import { CronJob } from "kubernetes-models/batch/v1beta1/CronJob"

const manifests = []

if (env.env === "prod") {
  const HOST = process.env.CI_ENVIRONMENT_URL
  ok(HOST);
  const cronJob = new CronJob({
    metadata: {
      name: "onvs-email-alerts",
      namespace: "onvs",
    },
    spec: {
      schedule: "30 17 * * FRI",
      jobTemplate: {
        spec: {
          template: {
            spec: {
              containers: [
                {
                  name: "send-email-alert",
                  image: `curlimages/curl:7.73.0`,
                  command: [
                    "curl",
                    "-H",
                    `Authorisation: Bearer $(MAIL_WEBHOOK_TOKEN)`,
                    `${HOST}/api/send-report`,
                  ],
                  envFrom: [
                    {
                      secretRef: {
                        name: "app-sealed-secret",
                      },
                    },
                  ],
                },
              ],
              restartPolicy: "Never",
            },
          },
        },
      },
    },
  })
  manifests.push(cronJob)
}

export default manifests
