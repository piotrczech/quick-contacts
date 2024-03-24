/**
 * Represents contact information.
 */
export default class ContactInfo {
  /**
   * Creates a new ContactInfo object.
   * @param {Object} data - Contact data.
   * @param {string} data.id - Contact ID.
   * @param {string} data.firstName - Contact's first name.
   * @param {string} data.phoneNumber - Contact's phone number.
   * @param {string} [data.lastName] - Contact's last name (optional).
   * @param {string} [data.email] - Contact's email address (optional).
   * @throws {Error} Throws an error if required fields are missing.
   */
  constructor({ id, firstName, phoneNumber, lastName, email }) {
    if (!id || !firstName || !phoneNumber) {
      throw new Error('Missing required fields: id, firstName, phoneNumber')
    }

    /**
     * Contact ID.
     * @type {string}
     */
    this.id = id

    /**
     * Contact's first name.
     * @type {string}
     */
    this.firstName = firstName

    /**
     * Contact's last name.
     * @type {string|null}
     */
    this.lastName = lastName ?? null

    /**
     * Contact's phone number.
     * @type {string}
     */
    this.phoneNumber = phoneNumber

    /**
     * Contact's email address.
     * @type {string|null}
     */
    this.email = email ?? null
  }
}
