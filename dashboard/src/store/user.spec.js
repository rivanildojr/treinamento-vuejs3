import useStore from '@/hooks/useStore'

import {
  setCurrentUser,
  resetUserStore,
  setApiKey,
  cleanCurrentUser
} from './user'

let store = null

describe('UserStore', () => {
  beforeEach(() => {
    store = useStore()
  })

  afterEach(() => {
    resetUserStore()
  })

  it('should set current user', () => {
    setCurrentUser({ name: 'Rivanildo' })

    expect(store.User.currentUser.name).toBe('Rivanildo')
  })

  it('should set API_KEY on current user', () => {
    setApiKey('1234')

    expect(store.User.currentUser.apiKey).toBe('1234')
  })

  it('should clean current user', () => {
    setCurrentUser({ name: 'Rivanildo' })
    expect(store.User.currentUser.name).toBe('Rivanildo')

    cleanCurrentUser()
    expect(store.User.currentUser.name).toBeFalsy()
  })
})
