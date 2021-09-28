import React from "react"

export function BadgeLevel({ level }: { level: number }): JSX.Element | null {
  const defaultColor = {
    text: "gray-800",
    bg: "gray-100",
    border: "gray-800",
  }

  const colors = {
    1: {
      text: "yellow-700",
      bg: "yellow-300",
      border: "yellow-500",
    },
    2: {
      text: "yellow-900",
      bg: "yellow-500",
      border: "yellow-600",
    },
    3: {
      text: "red-100",
      bg: "red-500",
      border: "red-400",
    },
    4: {
      text: "purple-100",
      bg: "purple-600",
      border: "purple-200",
    },
  }

  const color = colors[level] || defaultColor

  return (
    <span
      className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full border border-${color.border} text-${color.text} bg-${color.bg}`}
      title="Échelle allant de 1 (la moins grave) à 4 (la plus grave) pour les personnes ou 3 pour les biens."
    >
      {String(level)}
    </span>
  )
}
