interface SetupPayload {
  onProduction: () => void
  onDevelopment: () => void
}

export function setup({ onProduction, onDevelopment }: SetupPayload) {
  if (import.meta.env.NODE_ENV === 'production') {
    onProduction()

    return
  }

  onDevelopment()
}
