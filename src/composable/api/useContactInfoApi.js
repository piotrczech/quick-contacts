import useCRUDapi, { CRUD } from './useCRUDapi'

/**
 * CRUD operations for contact info.
 *
 * @returns {object} Object containing functions for CRUD operations and loading state.
 */
const useContactInfoApi = () => {
  const { isLoading, getAll, addData, updateData } = useCRUDapi('contact-info', [
    CRUD.READ_ALL,
    CRUD.CREATE,
    CRUD.UPDATE
  ])

  return {
    isLoading,
    getAllContactInfo: getAll,
    addContactInfo: addData,
    updateContactInfo: updateData
  }
}

export default useContactInfoApi
