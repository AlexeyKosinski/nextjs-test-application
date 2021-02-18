export const useFormText = (props) => {
  const { onChangeField, formData, errors, ...rest } = props

  if (rest.name) {
    if (onChangeField && typeof onChangeField === 'function') {
      rest.onChange = onChangeField(rest.name)
    }
    if (formData) {
      rest.value = formData[rest.name] || ''
    }
    if (errors && errors[rest.name]) {
      rest.label = errors[rest.name]
      rest.error = true
    }
  }

  return { ...rest, onChange: rest.onChange }
}
