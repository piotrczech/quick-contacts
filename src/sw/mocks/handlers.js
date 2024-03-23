import { http, HttpResponse } from 'msw'

const handlers = [
  http.get('/api/v1/test', () => {
    return HttpResponse.json({ msg: 'it works!' })
  })
]

export default handlers
