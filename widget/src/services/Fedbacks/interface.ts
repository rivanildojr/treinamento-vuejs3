import type { CreatePayload, Create } from './types'

export interface IFeedbackService {
  create(create: CreatePayload): Promise<Create>
}
