export const needToShowError = (
  control?: {
    errors?: any
    touched: boolean | null
    dirty: boolean | null
  },
  form?: {
    submitted: boolean | null
  }
) => {
  return control?.errors && (control.touched || control.dirty || form?.submitted)
}
