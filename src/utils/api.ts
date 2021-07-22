import type { NextApiRequest, NextApiResponse } from "next"
import { ZodError } from "zod"
import { OnvsError } from "./errors"

export function handleNotAllowedMethods(
  req: NextApiRequest,
  res: NextApiResponse,
): void {
  if (req.method === "OPTIONS") {
    res.status(200).json({})
  } else {
    res.status(405).json({ message: "Not allowed HTTP method." })
  }
}
export function handleErrors(
  error: Error & { statusCode?: number },
  res: NextApiResponse,
): void {
  console.error("API error", error)

  let message = "API error"
  let details

  if (error?.statusCode) {
    res.status(error?.statusCode).json({ message: error.message })
  } else if (error instanceof ZodError) {
    // const paths = error?.issues.map((issue) => issue.path)
    details = error.format()

    message = `Error on field(s) : ${Object.keys(details).join(", ")}`
  } else if (error instanceof OnvsError) {
    message = error.message
  }

  res.status(500).json({ message, ...(details && { details }) })
}
