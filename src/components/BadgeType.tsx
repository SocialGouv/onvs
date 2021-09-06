import React from "react"
import { Badge } from "./Badge"

export function BadgeType({ type }: { type: string }): JSX.Element | null {
  switch (type) {
    case "ets": {
      return <Badge content="Établissement" />
    }
    case "liberal": {
      return (
        <Badge
          content="Libéral"
          colors={{ text: "text-green-800", bg: "bg-green-100" }}
        />
      )
    }
    default: {
      return null
    }
  }
}
