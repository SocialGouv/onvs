import React from "react";
import { useForm } from "react-hook-form";

import { useEffectToast } from "./useEffectToast";

export const DeclarationPageContext = React.createContext();
DeclarationPageContext.displayName = "DeclarationPageContext";

export function useDeclarationContext() {
  const context = React.useContext(DeclarationPageContext);
  if (!context) {
    throw new Error(
      "useDeclarationForm must be used in a <DeclarationPageContext>"
    );
  }

  return context;
}

export function useDeclarationForm({ defaultValuesFromState, resolver } = {}) {
  const context = useDeclarationContext();

  const defaultValues = defaultValuesFromState
    ? defaultValuesFromState(context?.state)
    : {};

  const { control, errors, handleSubmit, setValue, register, watch, setError } =
    useForm({
      defaultValues,
      resolver,
    });

  useEffectToast(errors);

  return {
    ...context,
    control,
    errors,
    handleSubmit,
    register,
    setError,
    setValue,
    watch,
  };
}
