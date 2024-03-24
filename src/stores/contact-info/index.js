import { defineStore } from 'pinia'
import useContactInfoApi from '@/composable/api/useContactInfoApi'
import { onMounted, ref } from 'vue'

/**
 * Contact info store.
 */
export const useContactInfoStore = defineStore('contactInfo', () => {
  /**
   * List of all contact information.
   */
  const contactInfoList = ref([])

  /**
   * Flag indicating whether data is currently being loaded.
   */
  const isLoading = ref(false)

  const { getAllContactInfo, getOneContactInfo, createOneContactInfo, updateOneContactInfo } =
    useContactInfoApi()

  /**
   * Fetches the list of contact information from the API.
   *
   * @param {boolean} [shadowLoad=true] Flag indicating whether to perform a "shadow" load.
   * @returns {Promise<void>}
   */
  const fetchContactInfoList = async (shadowLoad = true) => {
    isLoading.value = !shadowLoad

    try {
      contactInfoList.value = await getAllContactInfo()
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchContactInfo = async (id) => {
    if (Number.isNaN(id) || !id) return

    try {
      const contactInfo = await getOneContactInfo(id)

      // Find the index of the contact info in the list
      const index = contactInfoList.value.findIndex((contact) => contact.id == id)

      if (index >= 0) {
        // To maintain reactivity
        contactInfoList.value.splice(index, 1, contactInfo)
      }
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Adds a new contact information.
   *
   * @param {Object} inputsValues - Values of the contact information to add.
   */
  const addContactInfo = async (inputsValues) => {
    try {
      await createOneContactInfo(inputsValues)
    } catch (error) {
      console.error(error)
    }

    contactInfoList.value.push(inputsValues)
    fetchContactInfoList(true)
  }

  /**
   * Edits an existing contact info.
   *
   * @param {number} id - The ID of the contact information to edit.
   * @param {Object} inputsValues - Updated values of the contact information.
   */
  const editContactInfo = async (id, inputsValues) => {
    try {
      await updateOneContactInfo(id, inputsValues)
    } catch (error) {
      console.error(error)
    }

    // Find the index of the contact info in the list
    const index = contactInfoList.value.findIndex((contact) => contact.id == id)

    // To maintain reactivity
    const updatedContact = { ...contactInfoList.value[index], ...inputsValues }
    contactInfoList.value.splice(index, 1, updatedContact)

    fetchContactInfoList(true)
  }

  /**
   * Retrieves contact information by ID.
   *
   * @param {string} id - The ID of the contact to retrieve.
   * @returns {Object|null} The contact information if found, otherwise null.
   */
  const getContactInfoById = (id) => {
    return contactInfoList.value.find((contact) => contact.id == id) || null
  }

  onMounted(() => {
    fetchContactInfoList()
  })

  return {
    contactInfoList,
    isLoading,
    fetchContactInfoList,
    fetchContactInfo,
    addContactInfo,
    editContactInfo,
    getContactInfoById
  }
})
