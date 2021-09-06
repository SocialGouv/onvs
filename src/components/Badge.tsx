import React from "react"

type ColorsType = {
  text?: string
  bg?: string
}

export function Badge({
  content,
  colors,
}: {
  content: string
  colors?: ColorsType
}): JSX.Element | null {
  const color = colors?.text || "text-green-800"
  const bgColor = colors?.bg || "bg-blue-100"
  return (
    <span
      className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${color} ${bgColor}`}
    >
      {content}
    </span>
  )
}
