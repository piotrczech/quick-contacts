import { http, HttpResponse } from 'msw'
import { API_PREFIX } from './../utils'
import ContactInfoController from './controller'
import contactInfoDefaultValues from './defaultValues'

const contactInfoController = new ContactInfoController(contactInfoDefaultValues)

/**
 * Handlers for managing contact info endpoints.
 *
 * @type {Array}
 */
const handlers = [
  /**
   * Handler for retrieving all contact info.
   */
  http.get(`${API_PREFIX}/contact-info`, () => {
    return HttpResponse.json(contactInfoController.getAll())
  }),

  /**
   * Handler for adding new contact info.
   *
   * @param {Object} request HTTP request containing new contact info data.
   */
  http.post(`${API_PREFIX}/contact-info`, async ({ request }) => {
    try {
      const newContactInfoData = await request.json()
      const newContactInfo = contactInfoController.addOne(newContactInfoData)
      return HttpResponse.json(newContactInfo, { status: 201 })
    } catch (error) {
      return HttpResponse.error(error.message, { status: 409 })
    }
  })
]

export default handlers
