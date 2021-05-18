import { renameKeys, revertObject } from "@/utils/object";

describe("Tests for revertObject", () => {
  test("Tests of for revertObject", () => {
    const mapping = {
      firstName: "first_name",
      lastName: "last_name",
    };

    expect(revertObject(mapping)).toMatchInlineSnapshot(`
      Object {
        "first_name": "firstName",
        "last_name": "lastName",
      }
    `);
  });
});

describe("Tests for renameKeys", () => {
  test("Rename properties standard case", () => {
    const obj = {
      firstName: "John",
      lastName: "Mc Lane",
    };

    const mapping = {
      firstName: "first_name",
      lastName: "last_name",
    };

    expect(renameKeys(obj, mapping)).toMatchInlineSnapshot(`
          Object {
            "first_name": "John",
            "last_name": "Mc Lane",
          }
      `);
  });

  test("Rename properties with more mapping keys than the object", () => {
    const obj = {
      firstName: "John",
      lastName: "Mc Lane",
    };

    const mapping = {
      age: "age",
      firstName: "first_name",
      lastName: "last_name",
    };

    expect(renameKeys(obj, mapping)).toMatchInlineSnapshot(`
          Object {
            "first_name": "John",
            "last_name": "Mc Lane",
          }
      `);
  });

  test("Rename properties with more object keys than the mapping", () => {
    const obj = {
      firstName: "John",
      lastName: "Mc Lane",
      profession: "policeman",
    };

    const mapping = {
      firstName: "first_name",
      lastName: "last_name",
    };

    expect(renameKeys(obj, mapping)).toMatchInlineSnapshot(`
          Object {
            "first_name": "John",
            "last_name": "Mc Lane",
          }
      `);
  });
});
