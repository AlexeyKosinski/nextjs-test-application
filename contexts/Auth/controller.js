import { ObjectControllerWithApi } from '../../services/controller-context'

const LS_KEY = 'auth'

export class AuthController extends ObjectControllerWithApi {
  _init() {
    this.handlers.logIn = this.logIn.bind(this)
    this.handlers.signOut = this.signOut.bind(this)
    this.loadFromLocalStorage()
  }

  loadFromLocalStorage() {
    if (typeof window !== 'undefined') {
      const userData = window.localStorage.getItem(LS_KEY)
      if (typeof userData === 'string' && userData.length > 0) {
        try {
          const data = JSON.parse(userData)
          if (typeof data === 'object' && data.jwt) {
            this.dispatch({
              user: {
                jwt: data.jwt,
                name: data.name,
                lastName: data.lastName,
                isAuthenticated: !!data.jwt,
              },
            })
          }
        } catch (e) {
          console.error('JSON.parse error', e)
        }
      }
    }
  }

  saveToLocalStorage(data = {}) {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(LS_KEY, JSON.stringify(data))
      } catch (e) {
        console.error('JSON.stringify error', e)
      }
    }
  }

  async logIn({ formData }) {
    const userData = await this.post('/signin', formData)
    this.dispatch({ user: { ...userData, isAuthenticated: true } })
    this.saveToLocalStorage(userData)
  }

  async signOut() {
    this.dispatch({ user: {} })
    this.saveToLocalStorage()
  }

}
