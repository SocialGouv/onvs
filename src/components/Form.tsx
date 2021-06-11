import React from "react"

export const Form = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => (
  <>
    <div className="container px-16 mx-auto ">{children}</div>
  </>
)

export const AlertInput = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element | null =>
  children ? (
    <span role="alert" className="text-sm" style={{ color: "tomato" }}>
      {children}
    </span>
  ) : null
