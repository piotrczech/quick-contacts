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
   * Adds a new contact.
   *
   * @param {Object} data Contact data.
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
}

export default ContactInfoController
