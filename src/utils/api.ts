import type { NextApiRequest, NextApiResponse } from "next"

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
export function handleErrors(error: Error, res: NextApiResponse): void {
  console.error(error)
  res.status(500).json({ message: error.message || "Server error" })
}
