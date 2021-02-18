import ObjectController from './objectController'

export default class FormController extends ObjectController {
  constructor(state) {
    super({ errors: {}, formData: {}, ...state })
    this._handlers.onChangeField = this.changeField.bind(this)
    this._handlers.onChangeFieldValue = this.changeFieldValue.bind(this)
    this._handlers.isValid = this.isValid.bind(this)
    this._handlers.submit = this.submit.bind(this)
    this._handlers.dispatch = this.dispatch.bind(this)
    this._handlers.getField = this.getField.bind(this)
    this._handlers.setField = this.setField.bind(this)
    this._handlers.getNumberField = this.getNumberField.bind(this)
    this._handlers.getBoolField = this.getBoolField.bind(this)
    this._handlers.updateRequired = this.updateRequired.bind(this)
    this._handlers.update = this.update.bind(this)
    this._handlers.dispatch = this.dispatch.bind(this)
  }

  getField(fName) {
    const { formData } = this._state
    return formData[fName] ? formData[fName] : undefined
  }

  getNumberField(fName) {
    const { formData } = this._state
    return formData[fName] ? Number(formData[fName]) || 0 : undefined
  }

  getBoolField(fName) {
    const { formData } = this._state
    return formData[fName] ? Boolean(formData[fName]) : undefined
  }

  setError = (errors) => {
    this.dispatch({ errors })
  }

  isValid() {
    const { required = [], formData } = this._state
    return required.every((field) => !!formData[field])
  }

  updateRequired(newRequired) {
    this.dispatch({ required: newRequired })
  }

  changeField = (prop) => (e, v) => {
    let value
    if (typeof v !== 'undefined') {
      value = v
    } else if (e && e.target && typeof e.target.value === 'string') {
      value = e.target.value
    } else {
      value = e
    }
    this.changeFieldValue(prop)(value)
  }

  setField(fName, value) {
    if (Object.keys(this.state.errors).length) {
      this.setError({})
    }
    this.dispatch({ formData: { ...this.state.formData, [fName]: value } })
  }

  changeFieldValue = (prop) => (value) => {
    this.setField(prop, value)
    if (this.state.onChangeField && this.state.onChangeField[prop]) {
      this.state.onChangeField[prop](value)
    }
  }

  catchError = async (promise) => {
    try {
      return await promise
    } catch (e) {
      this.setError(e.data)
      throw e
    }
  }

  submit = (submitHandler) => {
    return this.catchError(submitHandler(this._state, this.dispatch)).catch(console.error)
  }

  valueOf() {
    const { errors, formData, required } = this._state

    return {
      state: this._state,
      errors,
      formData,
      required,
      fieldProps: {
        onChangeField: this.changeField.bind(this),
        errors,
        formData,
      },
      ...this._handlers,
    }
  }
}
