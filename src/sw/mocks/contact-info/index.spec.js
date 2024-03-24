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
        lastName: 'Wielka',
        phoneNumber: '000000000',
        email: 'kasia@skrzynka.pl'
      }
    ])
  })

  it('(GET) should get one specific by id', async () => {
    const contactInfo = await axios
      .get('contact-info/2')
      .then((resp) => resp.data)
      .catch((e) => e)

    expect(contactInfo).toEqual({
      id: 2,
      firstName: 'Katarzyna',
      lastName: 'Wielka',
      phoneNumber: '000000000',
      email: 'kasia@skrzynka.pl'
    })
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

  it('(POST) should provide new ID as max current ID + 1', async () => {
    let contactInfoList = await axios
      .get('contact-info')
      .then((resp) => resp.data)
      .catch((e) => e)

    const oldId = contactInfoList[1].id

    expect(oldId).toBe(2)

    const newContactInfo = {
      firstName: 'Władysław',
      lastName: 'Łokietek',
      phoneNumber: '222111222',
      email: 'wladi@onet.pl'
    }

    const response = await axios.post('contact-info', newContactInfo)
    expect(response.status).toBe(201)

    contactInfoList = await axios
      .get('contact-info')
      .then((resp) => resp.data)
      .catch((e) => e)
    expect(contactInfoList[2]).toEqual({
      id: 3,
      ...newContactInfo
    })
  })

  it('(POST) should not be possible to provide custom id', async () => {
    const newContactInfo = {
      id: 15,
      firstName: 'Władysław',
      lastName: 'Łokietek',
      phoneNumber: '222111222',
      email: 'wladi@onet.pl'
    }

    const response = await axios.post('contact-info', newContactInfo)

    expect(response.status).toBe(201)
    expect(response.data).toEqual({
      ...newContactInfo,
      id: 3
    })

    const contactInfoList = await axios
      .get('contact-info')
      .then((resp) => resp.data)
      .catch((e) => e)

    expect(contactInfoList.length).toBe(3)
    expect(contactInfoList[2]).toEqual({
      ...newContactInfo,
      id: 3
    })
  })

  it('(PUT) should update existing contact info', async () => {
    const updatedContactInfo = {
      id: 2,
      firstName: 'Haaland',
      email: 'skrzynka@pocztowa.com'
    }

    const response = await axios.put(`contact-info/${updatedContactInfo.id}`, updatedContactInfo)
    expect(response.status).toBe(200)

    const contactInfoList = await axios
      .get('contact-info')
      .then((resp) => resp.data)
      .catch((e) => e)

    expect(contactInfoList[1]).toEqual({
      phoneNumber: '000000000',
      lastName: 'Wielka',
      ...updatedContactInfo
    })
  })
})
