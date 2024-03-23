import { http, HttpResponse } from 'msw'
import { API_PREFIX } from './../utils'
import ContactInfoController from './controller'
import contactInfoDefaultValues from './defaultValues'

const contactInfoController = new ContactInfoController(contactInfoDefaultValues)

/**
 * Handlers for managing contact info endpoints.
 * @type {Array}
 */
const handlers = [
  /**
   * Handler for retrieving all contact info.
   */
  http.get(`${API_PREFIX}/contact-info`, () => {
    return HttpResponse.json(contactInfoController.getAll())
  })
]

export default handlers
