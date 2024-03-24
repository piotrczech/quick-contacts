import { ref } from 'vue'
import axios from '@axios'

/**
 * Possible CRUD operations.
 *
 * @enum {string}
 */
export const CRUD = Object.freeze({
  CREATE: 'POST',
  READ_ALL: 'GET_ALL',
  READ_ONE: 'GET_ONE',
  UPDATE: 'PUT',
  DELETE: 'DELETE'
})

/**
 * Hook for handling CRUD operations using Axios.
 *
 * @param {string} url The API endpoint URL.
 * @param {Array.<string>} methods Array containing CRUD operations to handle.
 *
 * @returns {object} Object containing functions for CRUD operations and loading state.
 */
const useCRUDapi = (
  url,
  methods = [CRUD.READ_ONE, CRUD.READ_ALL, CRUD.CREATE, CRUD.UPDATE, CRUD.DELETE]
) => {
  const isLoading = ref(false)

  const availableMethods = methods.reduce((acc, method) => {
    acc[method] = true
    return acc
  }, {})

  /**
   * Helper function to make HTTP requests.
   *
   * @param {string} method The HTTP method.
   * @param {object} data The data to send with the request (optional).
   * @param {string|null} id The ID for single item operations (optional).
   *
   * @returns {Promise<object>} Promise representing the result of the HTTP request.
   */
  const makeRequest = async (method, data = null, id = null) => {
    if (!availableMethods[method]) {
      throw new Error(`Method ${method} is not supported`)
    }

    let requestUrl = url
    if (id) requestUrl += `/${id}`

    try {
      isLoading.value = true
      const requestMethod = [CRUD.READ_ALL, CRUD.READ_ONE].includes(method)
        ? 'get'
        : method.toLowerCase()

      const response = await axios[requestMethod](requestUrl, data)

      return response.data
    } catch (err) {
      throw new Error(err.message || `An error occurred while executing ${method} request`)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Retrieves all items.
   *
   * @returns {Promise<object>} Promise representing the result of the HTTP request.
   */
  const getAll = async () => {
    return await makeRequest(CRUD.READ_ALL)
  }

  /**
   * Retrieves a single item by ID.
   *
   * @param {string} id The ID of the item to retrieve.
   * @returns {Promise<object>} Promise representing the result of the HTTP request.
   */
  const getOne = async (id) => {
    return await makeRequest(CRUD.READ_ONE, null, id)
  }

  /**
   * Adds a new item.
   *
   * @param {object} newData The data for the new item.
   * @returns {Promise<object>} Promise representing the result of the HTTP request.
   */
  const addData = async (newData) => {
    return await makeRequest(CRUD.CREATE, newData)
  }

  /**
   * Updates an existing item.
   *
   * @param {string} id The ID of the item to update.
   * @param {object} updatedData The updated data for the item.
   * @returns {Promise<object>} Promise representing the result of the HTTP request.
   */
  const updateData = async (id, updatedData) => {
    return await makeRequest(CRUD.UPDATE, updatedData, id)
  }

  /**
   * Deletes an item by ID.
   *
   * @param {string} id The ID of the item to delete.
   * @returns {Promise<boolean>} Promise representing the success of the deletion.
   */
  const deleteData = async (id) => {
    return await makeRequest(CRUD.DELETE, null, id)
  }

  return {
    isLoading,

    getAll,
    getOne,
    addData,
    updateData,
    deleteData
  }
}

export default useCRUDapi
