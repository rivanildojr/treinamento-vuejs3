import { reactive, readonly } from 'vue'

import { NAME_COMPONENTS_WIZARD } from '@/constants/nameComponents'

export type StoreState = {
  currentComponent: string
  message: string
  feedbackType: string
  fingerprint: string
  apiKey: string
  currentPage: string
}

const initialState: StoreState = {
  currentComponent: NAME_COMPONENTS_WIZARD.SELECT_FEEDBACK_TYPE,
  message: '',
  feedbackType: '',
  fingerprint: '',
  apiKey: '',
  currentPage: ''
}

const state = reactive<StoreState>({ ...initialState })

export function setCurrentComponent(component: string): void {
  state.currentComponent = component
}

export function setMessage(message: string): void {
  state.message = message
}

export function setFeedbackType(feedbackType: string): void {
  state.feedbackType = feedbackType
}

export function setFingerprint(fingerprint: string): void {
  state.fingerprint = fingerprint
}

export function setApiKey(apiKey: string): void {
  state.apiKey = apiKey
}

export function setCurrentPage(currentPage: string): void {
  state.currentPage = currentPage
}

export function resetStore(): void {
  setCurrentComponent(initialState.currentComponent)
  setMessage(initialState.message)
  setFeedbackType(initialState.feedbackType)
  setFingerprint(initialState.fingerprint)
  setApiKey(initialState.apiKey)
  setCurrentPage(initialState.currentPage)
}

export default readonly(state)
