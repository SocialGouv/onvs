export const buildSelectOptions = (arr) =>
  arr?.map((label) => ({ label, value: label })) || []
