import type { NextApiRequest, NextApiResponse } from "next"
import { composeError } from "./errors"

export function checkAllowedMethods({
  allowMethods,
}: {
  allowMethods: string[]
}) {
  return function (handler: (req, res) => void) {
    return async function (
      req: NextApiRequest,
      res: NextApiResponse,
    ): Promise<void> {
      if (req?.method === "OPTIONS") {
        return res.status(200).json({})
      } else if (!req?.method || !allowMethods.includes(req.method)) {
        return res.status(405).json({ message: "Not allowed HTTP method." })
      }
      await handler(req, res)
    }
  }
}

export function handleErrors(
  error: Error & { statusCode?: number },
  res: NextApiResponse,
): void {
  console.error("API error", error)

  const { message, statusCode, details } = composeError(error)

  res.status(statusCode).json({ message, ...(details && { details }) })
}

export function handleApiError(handler: (req, res) => void) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse,
  ): Promise<void> {
    try {
      await handler(req, res)
    } catch (error) {
      handleErrors(error, res)
    }
  }
}
