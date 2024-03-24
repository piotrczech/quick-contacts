import ContactInfo from '@/models/contactInfoModel'

/**
 * ContactInfoController class responsible for managing contact information.
 */
class ContactInfoController {
  /**
   * Constructs a new ContactInfoController instance.
   *
   * @param {Array} defaultValues Array of default contact info values.
   */
  constructor(defaultValues = []) {
    /**
     * Map containing all existing contact info.
     *
     * @type {Map}
     */
    this.contactInfo = new Map()

    defaultValues.forEach((contactInfo) => {
      this.contactInfo.set(contactInfo.id, contactInfo)
    })
  }

  /**
   * Retrieves all contact info.
   *
   * @returns {Array} Array of contact info objects.
   */
  getAll() {
    return Array.from(this.contactInfo.values())
  }

  /**
   * Retrieves one contact info by id.
   *
   * @param {number} id ID of the contact to get.
   * @returns {Array} Array of contact info objects.
   */
  getOne(id) {
    return this.contactInfo.get(id) ?? null
  }

  /**
   * Adds a new contact.
   *
   * @param {Object} requestData Contact data.
   * @returns {string|null} ID of the newly added contact, or null if failed.
   */
  addOne(requestData) {
    if (!requestData.firstName || !requestData.phoneNumber) {
      throw new Error('First name and phone number are required.')
    }

    const newId = Math.max(...this.contactInfo.keys(), 0) + 1
    const newContactInfo = new ContactInfo({ ...requestData, id: newId })

    this.contactInfo.set(newId, newContactInfo)

    return newContactInfo
  }

  /**
   * Edits an existing contact.
   *
   * @param {number} id ID of the contact to edit.
   * @param {Object} requestData Updated contact data.
   */
  editOne(id, requestData) {
    if (!this.contactInfo.has(id)) {
      throw new Error(`Contact with ID ${id} not found.`)
    }

    const selectedContactInfo = this.contactInfo.get(id)
    const editedContactInfo = new ContactInfo({ ...selectedContactInfo, ...requestData })

    this.contactInfo.set(id, editedContactInfo)

    return editedContactInfo
  }
}

export default ContactInfoController
