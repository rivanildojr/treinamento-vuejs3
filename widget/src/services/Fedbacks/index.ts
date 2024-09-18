import type { AxiosInstance } from 'axios'

import type { Feedback } from '@/types/feedback'
import type { RequestError } from '@/types/error'

import type { IFeedbackService } from './interface'
import type { Create, CreatePayload } from './types'

function FeedbacksService(httpClient: AxiosInstance): IFeedbackService {
  async function create(payload: CreatePayload): Promise<Create> {
    const response = await httpClient.post<Feedback>('/feedbacks', payload)

    let errors: RequestError | null = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      errors
    }
  }

  return {
    create
  }
}

export default FeedbacksService
