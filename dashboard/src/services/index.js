import router from '@/router'
import axios from 'axios'

import AuthService from './auth'
import UsersService from './users'

import { setGlobalLoading } from '@/store/global'

const API_ENVS = {
  production: '',
  development: '',
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS.local
})

httpClient.interceptors.response.use(response => {
  setGlobalLoading(false)

  return response
}, (error) => {
  const canThrowAnError = error.request.status === 0 || error.request.status === 500

  if (canThrowAnError) {
    setGlobalLoading(false)
    throw new Error(error.message)
  }

  if (error.request.status === 401) router.push({ name: 'Home' })

  setGlobalLoading(false)
  return error
})

httpClient.interceptors.request.use(config => {
  setGlobalLoading(true)
  const token = window.localStorage.getItem('token-feedbacker')

  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`
  }

  return config
})

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient)
}
