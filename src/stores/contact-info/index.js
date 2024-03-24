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

  const { getAllContactInfo, createOneContactInfo } = useContactInfoApi()

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
    addContactInfo,
    getContactInfoById
  }
})
