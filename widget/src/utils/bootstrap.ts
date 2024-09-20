interface SetupPayload {
  onProduction: () => void
  onDevelopment: () => void
}

export function setup({ onProduction, onDevelopment }: SetupPayload) {
  if (import.meta.env.VITE_NODE_ENV === 'production') {
    onProduction()

    return
  }

  onDevelopment()
}
