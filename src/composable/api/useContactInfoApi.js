import useCRUDapi, { CRUD } from './useCRUDapi'

/**
 * CRUD operations for contact info.
 *
 * @returns {object} Object containing functions for CRUD operations and loading state.
 */
const useContactInfoApi = () => {
  const { isLoading, getAll, createOne, updateOne } = useCRUDapi('contact-info', [
    CRUD.READ_ALL,
    CRUD.CREATE,
    CRUD.UPDATE
  ])

  return {
    isLoading,
    getAllContactInfo: getAll,
    addContactInfo: createOne,
    updateContactInfo: updateOne
  }
}

export default useContactInfoApi
