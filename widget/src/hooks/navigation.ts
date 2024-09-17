import useStore from '@/hooks/store'

import { setCurrentComponent, setFeedbackType } from '@/store'

import { NAME_COMPONENTS_WIZARD } from '@/constants/nameComponents'

export interface Navigation {
  next: () => void
  back: () => void
  setErrorState: () => void
  setSuccessState: () => void
}

export default function useNavigation() {
  const store = useStore()

  function next(): void {
    if (store.currentComponent === NAME_COMPONENTS_WIZARD.SELECT_FEEDBACK_TYPE) {
      setCurrentComponent(NAME_COMPONENTS_WIZARD.WRITE_A_FEEDBACK)
    }
  }

  function back(): void {
    if (store.currentComponent === NAME_COMPONENTS_WIZARD.WRITE_A_FEEDBACK) {
      setCurrentComponent(NAME_COMPONENTS_WIZARD.SELECT_FEEDBACK_TYPE)
      setFeedbackType('')
    }
  }

  function setErrorState(): void {
    setCurrentComponent(NAME_COMPONENTS_WIZARD.ERROR)
  }

  function setSuccessState(): void {
    setCurrentComponent(NAME_COMPONENTS_WIZARD.SUCCESS)
  }

  return {
    next,
    back,
    setErrorState,
    setSuccessState
  }
}
