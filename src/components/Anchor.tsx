import React from "react"

export default function ButtonAnchor({
  children,
  onClick,
  LeftIconComponent,
  RighIconComponent,
}: {
  children: string
  onClick: () => void
  LeftIconComponent?: any // TODO: find a better type to constrain to svg function component
  RighIconComponent?: any
}): JSX.Element {
  const props = { onClick }
  return (
    <button
      className="text-sm text-blue-600 hover:text-blue-900 whitespace-nowrap flex items-center cursor-pointer"
      {...props}
    >
      {LeftIconComponent && (
        <LeftIconComponent className="w-4 h-4" aria-hidden="true" />
      )}
      &nbsp;{children}
      {RighIconComponent && (
        <RighIconComponent className="w-4 h-4" aria-hidden="true" />
      )}
    </button>
  )
}
