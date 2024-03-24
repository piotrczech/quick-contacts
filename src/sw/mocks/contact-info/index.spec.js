import contactInfoHandlers, { initializeContactInfoController } from './index'
import { setupServer } from 'msw/node'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import axios from '@axios'

const server = setupServer()

beforeAll(() => server.listen())
beforeEach(() => {
  initializeContactInfoController()
  server.resetHandlers()
  server.use(...contactInfoHandlers)
})
afterAll(() => server.close())

describe('contact-info api', () => {
  it('should throw an error when attempting to initialize with invalid default values', async () => {
    const errorMsg = 'Default values for the contact info controller must be an array.'

    expect(() => initializeContactInfoController('abc')).toThrowError(errorMsg)
    expect(() => initializeContactInfoController(0)).toThrowError(errorMsg)
    expect(() => initializeContactInfoController(null)).toThrowError(errorMsg)
    expect(() => initializeContactInfoController({})).toThrowError(errorMsg)
  })

  it('(GET) should display 2 default contact info', async () => {
    const contactInfoList = await axios
      .get('contact-info')
      .then((resp) => resp.data)
      .catch((e) => e)

    expect(contactInfoList.length).toBe(2)
    expect(contactInfoList).toEqual([
      {
        id: 1,
        firstName: 'Piotr',
        lastName: null,
        phoneNumber: '111000111',
        email: null
      },
      {
        id: 2,
        firstName: 'Katarzyna',
        lastName: null,
        phoneNumber: '000000000',
        email: null
      }
    ])
  })

  it('(GET) should be possible to set an empty list as the initial value', async () => {
    initializeContactInfoController([])

    const contactInfoList = await axios
      .get('contact-info')
      .then((resp) => resp.data)
      .catch((e) => e)

    expect(contactInfoList.length).toBe(0)
    expect(contactInfoList).toEqual([])
  })
})
