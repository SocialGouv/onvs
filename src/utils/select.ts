export type SelectType = { label: string; value: string }

export const buildSelectOptions = (arr: string[]): Array<SelectType> =>
  arr?.map((label) => ({ label, value: label })) || []
