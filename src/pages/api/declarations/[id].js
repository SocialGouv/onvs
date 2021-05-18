import Cors from "micro-cors";

import { create, find } from "@/services/declarations";
import { isEmpty } from "@/utils/object";

const UNIQUE_VIOLATION_PG = "23505";

const handler = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  try {
    switch (req.method) {
      case "GET": {
        const act = await find(req.query);

        if (!act || isEmpty(act)) {
          res
            .status(404)
            .json({ error: "Erreur serveur : La déclaration n'existe pas" });
          return;
        }

        return res.status(200).json(act);
      }
      case "POST": {
        const id = await create(req.body);

        return res.status(200).json({ id });
      }
      default:
        if (req.method !== "OPTIONS") return res.status(405);
    }
  } catch (error) {
    console.error("Erreur API", error);
    console.error(`Message :${error.message}:`);
    if (error?.code === UNIQUE_VIOLATION_PG)
      res
        .status(409)
        .json({ error: `Erreur serveur : déclaration déjà présente` });
    else if (error.message === "Bad request")
      res
        .status(400)
        .json({ error: "Erreur serveur : requête HTTP mal formée" });
    else res.status(500).json({ error: `Erreur serveur` });
  }
};

const cors = Cors({
  allowMethods: ["GET", "OPTIONS", "POST"],
});

export default cors(handler);
