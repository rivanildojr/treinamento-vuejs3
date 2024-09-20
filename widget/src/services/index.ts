import axios from 'axios'

import FeedbacksService from './Fedbacks'

const API_ENVS: Record<string, string> = {
  production: 'https://backend-treinamento-vue3-seven-tawny.vercel.app',
  development: 'http://localhost:3000',
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS[import.meta.env.VITE_NODE_ENV] || API_ENVS.local
})

httpClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const canThrowAnError = error.request.status === 0 || error.request.status === 500

    if (canThrowAnError) {
      throw new Error(error.message)
    }

    return error
  }
)

export default {
  feedbacks: FeedbacksService(httpClient)
}
