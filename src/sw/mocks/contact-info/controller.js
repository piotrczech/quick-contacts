/**
 * ContactInfoController class responsible for managing contact information.
 */
class ContactInfoController {
  /**
   * Constructs a new ContactInfoController instance.
   * @param {Array} defaultValues Array of default contact info values.
   */
  constructor(defaultValues = []) {
    /**
     * Map containing all existing contact info.
     * @type {Map}
     */
    this.contactInfo = new Map()

    defaultValues.forEach((contactInfo) => {
      this.contactInfo.set(contactInfo.id, contactInfo)
    })
  }

  /**
   * Retrieves all contact info.
   * @returns {Array} Array of contact info objects.
   */
  getAll() {
    return Array.from(this.contactInfo.values())
  }
}

export default ContactInfoController
