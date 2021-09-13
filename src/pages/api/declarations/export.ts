import Cors from "micro-cors"
import { NextApiRequest, NextApiResponse } from "next"
import { pipe } from "lodash/fp"

import withSession from "@/lib/session"
import { checkAllowedMethods, handleApiError } from "@/utils/api"
import { AuthenticationError } from "@/utils/errors"
import { exportDeclarations } from "@/services/declarations/export"

const handler = async (
  req: NextApiRequest & { session: any },
  res: NextApiResponse,
) => {
  res.setHeader("Content-Type", "application/json")

  switch (req.method) {
    case "GET": {
      const user = req.session.get("user")

      if (!user?.isLoggedIn) {
        throw new AuthenticationError()
      }

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      )
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "Report.xlsx",
      )

      const workbook = await exportDeclarations({ ...req.query, user })

      await workbook.xlsx.write(res)

      return res.status(200).end()
    }
  }
}

const allowMethods = ["GET"]

export default pipe(
  withSession,
  Cors({
    allowMethods,
  }),
  checkAllowedMethods({ allowMethods }),
  handleApiError,
)(handler)
