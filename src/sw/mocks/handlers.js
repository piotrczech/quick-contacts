import { http, HttpResponse } from 'msw'
import { API_PREFIX } from './utils'

const handlers = [
  http.get(`${API_PREFIX}/test`, () => {
    return HttpResponse.json({ msg: 'it works!' })
  })
]

export default handlers
