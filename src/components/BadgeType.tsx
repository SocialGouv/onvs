import React from "react"

export function BadgeType({ type }: { type: string }): JSX.Element | null {
  switch (type) {
    case "ets": {
      return (
        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-blue-100 rounded-full">
          Établissement
        </span>
      )
    }
    case "liberal": {
      return (
        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
          Libéral
        </span>
      )
    }
    default: {
      return null
    }
  }
}
