import axios from 'axios'

export const axiosConfig = store => {
  store.subscribe(() => {
    const {
      user: {
        accessToken
      }
    } = store.getState()

    axios.defaults.headers = {
      Authorization: accessToken,
      accept: 'application/json'
    }

    axios.defaults.baseURL = '/api'

    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          console.log('401 - session invalidated')
          window.location.replace('/')
        }
        return Promise.reject(error)
      }
    )

  })
}
