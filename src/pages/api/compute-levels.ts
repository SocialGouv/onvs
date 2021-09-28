import Cors from "micro-cors"
import { checkAllowedMethods, handleApiError } from "@/utils/api"
import prisma from "@/prisma/db"
import { pipe } from "lodash/fp"
import { computeGoodsMaxLevel, computePersonsMaxLevel } from "@/utils/levels"
import { FactGoodsSchema, FactPersonsSchema } from "@/models/declarations"

/**
 * API to recompute the levels of facts.
 *
 * This API was created to be used once, since the data was not initially present.
 * But it can be reused if the computation for levels is not 100% correct.
 *
 * Its implementation is naive with no batch used.
 * I think it's acceptable, since the db volumetry is low.
 */
const handler = async (req, res) => {
  res.setHeader("Content-Type", "application/json")

  switch (req.method) {
    case "GET": {
      const declarations = await prisma.declaration.findMany()

      let count = 0

      for (const declaration of declarations) {
        // level can be 0, so we need to test null and undefined.
        if (
          declaration.factGoodsLevel == null ||
          declaration.factGoodsLevel == undefined ||
          declaration.factPersonsLevel == null ||
          declaration.factPersonsLevel == undefined
        ) {
          if (declaration.factGoods) {
            declaration.factGoodsLevel = computeGoodsMaxLevel(
              declaration.factGoods as FactGoodsSchema,
            )
          }
          declaration.factPersonsLevel = computePersonsMaxLevel(
            declaration.factPersons as FactPersonsSchema,
          )

          // Note : If needed in the future, execute this updates in batch queries for better performance.
          await prisma.declaration.update({
            where: {
              id: declaration.id,
            },
            data: declaration,
          })

          count++
        }
      }

      return res.status(200).json({ count })
    }
  }
}

const allowMethods = ["GET"]

export default pipe(
  Cors({
    allowMethods,
  }),
  checkAllowedMethods({ allowMethods }),
  handleApiError,
)(handler)
