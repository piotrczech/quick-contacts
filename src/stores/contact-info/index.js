import { defineStore } from 'pinia'
import useContactInfoApi from '@/composable/api/useContactInfoApi'
import { ref } from 'vue'

/**
 * Contact info store.
 */
export const useContactInfoStore = defineStore('contact-info', () => {
  /**
   * List of all contact information.
   */
  const contactInfoList = ref([])

  /**
   * Flag indicating whether data is currently being loaded.
   */
  const isLoading = ref(false)

  const { getAllContactInfo } = useContactInfoApi()

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

  return {
    contactInfoList,
    isLoading,
    fetchContactInfoList
  }
})
