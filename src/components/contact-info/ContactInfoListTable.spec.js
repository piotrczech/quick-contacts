import { describe, expect, it, beforeEach } from 'vitest'
import { createVuetify } from 'vuetify'
import { createTestingPinia } from '@pinia/testing'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { render, screen } from '@testing-library/vue'
import ContactInfoTable from './ContactInfoListTable.vue'

const vuetify = createVuetify({
  components,
  directives
})

// eslint-disable-next-line no-undef
global.ResizeObserver = require('resize-observer-polyfill')

beforeEach(() => {
  render(ContactInfoTable, {
    props: {
      id: 'tableId'
    },
    global: {
      plugins: [
        vuetify,
        createTestingPinia({
          initialState: {
            contactInfo: {
              contactInfoList: [
                {
                  id: 21957,
                  firstName: 'ala',
                  lastName: 'testowa',
                  phoneNumber: '000111222',
                  email: 'a@testuje.pl'
                }
              ]
            }
          }
        })
      ]
    }
  })
})

describe('ContactInfoTable.vue', async () => {
  it('Display table correctly', async () => {
    const table = await screen.findByTestId('contact-info-list-table')
    expect(table.id).toBe('tableId')

    const idCell = screen.getByText('21957')
    expect(idCell).toBeTruthy()

    const firstNameCell = screen.getByText('ala')
    expect(firstNameCell).toBeTruthy()

    const lastNameCell = screen.getByText('testowa')
    expect(lastNameCell).toBeTruthy()

    const phoneNumberCell = screen.getByText('000111222')
    expect(phoneNumberCell).toBeTruthy()

    const emailCell = screen.getByText('a@testuje.pl')
    expect(emailCell).toBeTruthy()
  })
})
