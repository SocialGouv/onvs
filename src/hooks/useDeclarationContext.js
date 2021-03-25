import React from "react"

export const DeclarationPageContext = React.createContext()
DeclarationPageContext.displayName = "DeclarationPageContext"

export function useDeclarationForm() {
  const context = React.useContext(DeclarationPageContext)

  if (!context)
    throw new Error(
      "useDeclarationForm must be used in a <DeclarationPageContext>",
    )

  return context
}
