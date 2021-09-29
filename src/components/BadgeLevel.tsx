import React from "react"

export function BadgeLevel({ level }: { level: number }): JSX.Element | null {
  const defaultColor = {
    text: "text-gray-800",
    bg: "bg-gray-100",
    border: "border-gray-800",
  }

  const colors = {
    1: {
      text: "text-yellow-700",
      bg: "bg-yellow-300",
      border: "border-yellow-500",
    },
    2: {
      text: "text-yellow-900",
      bg: "bg-yellow-500",
      border: "border-yellow-600",
    },
    3: {
      text: "text-red-100",
      bg: "bg-red-500",
      border: "border-red-400",
    },
    4: {
      text: "text-purple-100",
      bg: "bg-purple-600",
      border: "border-purple-200",
    },
  }

  const color = colors[level] || defaultColor

  return (
    <span
      className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full border ${color.border} ${color.text} ${color.bg}`}
      title="Échelle allant de 1 (la moins grave) à 4 (la plus grave) pour les personnes ou 3 pour les biens."
    >
      {String(level)}
    </span>
  )
}
