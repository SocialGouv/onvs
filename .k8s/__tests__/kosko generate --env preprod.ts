//

import { getEnvManifests } from "@socialgouv/kosko-charts/testing";
import { project } from "@socialgouv/kosko-charts/testing/fake/gitlab-ci.env";

jest.setTimeout(1000 * 60);
test("kosko generate --preprod", async () => {
  process.env.HARBOR_PROJECT = "onvs";
  expect(
    await getEnvManifests("preprod", "", {
      ...project("onvs").preprod,
      KUBE_NAMESPACE: "onvs-171-preprod-dev2",
      RANCHER_PROJECT_ID: "c-bd7z2:p-ngv88",
    })
  ).toMatchSnapshot();
});
