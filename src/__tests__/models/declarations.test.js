import { castJSToDB, validateJS } from "@/models/declarations/liberal";

import declarationSample from "./declaration-sample.json";

test("A correct declaration", async () => {
  const declaration = {
    date: "2020-09-09",
    job: {
      label: "Chiropracteur",
      value: "Chiropracteur",
    },
    location: "Cabinet individuel",
    otherLocation: "",
    town: "vincennes",
  };

  await expect(validateJS(declaration)).resolves.toMatchInlineSnapshot(`
          Object {
            "date": "2020-09-09",
            "job": "Chiropracteur",
            "location": "Cabinet individuel",
            "otherLocation": "",
            "town": "vincennes",
          }
        `);
});

test("A incorrect declaration", async () => {
  const consoleErrorLegacy = console.error;
  console.error = jest.fn();

  const declaration = {
    date: "",
    job: "Étudiant en santé",
    location: "Cabinet individuel",
    otherLocation: "",
    town: "vincennes",
  };

  await expect(validateJS(declaration)).rejects.toMatchInlineSnapshot(
    `[Error: Données invalides  (declarations/liberal modèle)]`
  );
  console.error = consoleErrorLegacy;
});

test("A full correct declaration", async () => {
  await expect(castJSToDB(declarationSample?.form)).resolves.toMatchSnapshot();
});
