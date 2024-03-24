import useCRUDapi, { CRUD } from './useCRUDapi'

/**
 * CRUD operations for contact info.
 *
 * @returns {object} Object containing functions for CRUD operations and loading state.
 */
const useContactInfoApi = () => {
  const { isLoading, getAll, getOne, createOne, updateOne } = useCRUDapi('contact-info', [
    CRUD.READ_ALL,
    CRUD.READ_ONE,
    CRUD.CREATE,
    CRUD.UPDATE
  ])

  return {
    isLoading,
    getAllContactInfo: getAll,
    getOneContactInfo: getOne,
    createOneContactInfo: createOne,
    updateOneContactInfo: updateOne
  }
}

export default useContactInfoApi
