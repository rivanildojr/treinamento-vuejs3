import { setApiKey, setCurrentPage, setFingerprint } from '@/store'

const VALUE_TEST = {
  API_KEY: 'fcd5015c-10d3-4e9c-b395-ec7ed8850165',
  PAGE: 'https://playground.com',
  FINGERPRINT: '1234567890'
}

interface IframeControl {
  updateCoreValuesOnStore: () => void
  notifyOpen: () => void
  notifyClose: () => void
}

export default function useIframeControl(): IframeControl {
  function updateCoreValuesOnStore(): void {
    if (import.meta.env.NODE_ENV === 'production') {
      const query = new URLSearchParams(window.location.search)

      const apiKey = query.get('api_key') ?? ''
      const page = query.get('page') ?? ''
      const fingerprint = query.get('fingerprint') ?? ''

      setApiKey(apiKey)
      setCurrentPage(page)
      setFingerprint(fingerprint)

      return
    }

    setApiKey(VALUE_TEST.API_KEY)
    setCurrentPage(VALUE_TEST.PAGE)
    setFingerprint(VALUE_TEST.FINGERPRINT)
  }

  function notifyOpen(): void {
    window.parent.postMessage(
      {
        isWidget: true,
        isOpen: true
      },
      '*'
    )
  }

  function notifyClose(): void {
    window.parent.postMessage(
      {
        isWidget: true,
        isOpen: false
      },
      '*'
    )
  }

  return {
    updateCoreValuesOnStore,
    notifyOpen,
    notifyClose
  }
}
