const PREFIX_WIDGET_URL = `https://rivanildojr-feedbacker-widget.netlify.app`
const PREFIX_BACKEND_URL = `https://backend-treinamento-vue3.vercel.app`

async function handleLoadWidget(apiKey) {
  const page = `${window.location.origin}${window.location.pathname}`

  const fp = await window.FingerprintJS.load()
  const fingerprint = fp.get()

  const WIDGET_URL = `${PREFIX_WIDGET_URL}?api_key=${apiKey}&page${page}&fingerprint=${fingerprint.visitorId}`

  const config = { method: 'HEAD' }
  const response = await fetch(`${PREFIX_BACKEND_URL}/apikey/exists?apikey=${apiKey}`, config)

  if (response.status === 200) {
    const iframe = document.createElement('iframe')

    iframe.src = WIDGET_URL
    iframe.id = 'feedbacker-iframe'
    iframe.style.position = 'fixed'
    iframe.style.bottom = '0px'
    iframe.style.right = '0px'
    iframe.style.border = '0px'
    iframe.style.overflow = 'hidden'
    iframe.style.zIndex = '99999'

    document.body.appendChild(iframe)

    window.addEventListener('message', (event) => {
      if (!event.data.isWidget) return

      if (event.data.isOpen) {
        iframe.width = '100%'
        iframe.height = '100%'
      } else {
        iframe.width = '300px'
        iframe.height = '150px'
      }
    })

    return
  }

  console.log('* [feedbacker] was not loaded because apikey does not exists')
}

function init(apiKey) {
  const script = document.createElement('script')

  script.src = 'https://openfpcdn.io/fingerprintjs/v4/iife.min.js'
  script.async = true
  script.addEventListener('load', handleLoadWidget(apiKey))

  document.body.appendChild(script)
}

window.init = init
