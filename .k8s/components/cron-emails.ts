import env from "@kosko/env"
import environments from "@socialgouv/kosko-charts/environments"
import { merge } from "@socialgouv/kosko-charts/utils/@kosko/env/merge"
import { ok } from "assert"
import { CronJob } from "kubernetes-models/batch/v1beta1/CronJob"

const name =  "onvs-email-alerts";
const ciEnv = environments(process.env);
const annotations = merge(ciEnv.metadata.annotations ?? {}, {
  "kapp.k14s.io/disable-default-ownership-label-rules": "",
  "kapp.k14s.io/disable-default-label-scoping-rules": "",
});
const labels = merge(ciEnv.metadata.labels ?? {}, {
  app: name,
});


//

ok(process.env.CI_ENVIRONMENT_URL);

const cronJob = new CronJob({
  metadata: {
    annotations,
    labels,
    name,
    namespace: ciEnv.metadata.namespace.name,
  },
  spec: {
    // schedule: "30 17 * * FRI",
    schedule: "* * 31 2 *", // 31 february, aka "is never run". See reference of this trick : https://stackoverflow.com/questions/52776690/disabling-cronjob-in-kubernetes).
    jobTemplate: {
      spec: {
        template: {
          metadata: {
            annotations,
            labels,
          },
          spec: {
            containers: [
              {
                name: "send-email-alert",
                image: `curlimages/curl:7.73.0`,
                command: [
                  "curl",
                  "-X",
                  "POST",
                  "-I",
                  "-H",
                  `Authorization: Bearer $(MAIL_WEBHOOK_TOKEN)`,
                  `${process.env.CI_ENVIRONMENT_URL}/api/send-report`,
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

export default env.env === "prod" ? [cronJob] : []
