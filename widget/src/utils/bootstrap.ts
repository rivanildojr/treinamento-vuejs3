interface SetupPayload {
  onProduction: () => void
  onDevelopment: () => void
}

export function setup({ onProduction, onDevelopment }: SetupPayload) {
  if (process.env.NODE_ENV === 'production') {
    onProduction()

    return
  }

  onDevelopment()
}
