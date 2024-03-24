import { http, HttpResponse } from 'msw'
import { API_PREFIX } from './../utils'
import ContactInfoController from './controller'
import contactInfoDefaultValues from './defaultValues'

let contactInfoController

/**
 * Initializes the ContactInfoController with default values.
 *
 * @param {Array} defaultValues Array of default contact info values.
 */
export const initializeContactInfoController = (defaultValues = contactInfoDefaultValues) => {
  if (!Array.isArray(defaultValues)) {
    throw new Error('Default values for the contact info controller must be an array.')
  }

  contactInfoController = new ContactInfoController(defaultValues)
}

initializeContactInfoController()

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
   * Handler for retrieving one specific contact info.
   */
  http.get(`${API_PREFIX}/contact-info/:id`, ({ params }) => {
    return HttpResponse.json(contactInfoController.getOne(Number(params.id)))
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
  }),

  /**
   * Handler for editing existing contact info.
   *
   * @param {Object} request HTTP request containing updated contact info data.
   */
  http.put(`${API_PREFIX}/contact-info/:id`, async ({ request, params }) => {
    try {
      const updatedContactInfoData = await request.json()
      const updatedContactInfo = contactInfoController.editOne(
        Number(params.id),
        updatedContactInfoData
      )
      return HttpResponse.json(updatedContactInfo)
    } catch (error) {
      return HttpResponse.error(error.message, { status: 404 })
    }
  })
]

export default handlers
