import type { Feedback } from '@/types/feedback'
import type { RequestError } from '@/types/error'

export type Create = {
  data: Feedback
  errors: RequestError | null
}

export type CreatePayload = {
  type: string
  text: string
  fingerprint: string
  device: string
  page: string
  apiKey: string
}
