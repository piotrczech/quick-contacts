import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import useCRUDapi, { CRUD } from './useCRUDapi'
import { setupServer } from 'msw/node'
import { HttpResponse, http } from 'msw'

const handlers = [
  http.get('/api/v1/items', () => HttpResponse.json([{ id: 1 }, { id: 2 }])),
  http.get('/api/v1/items/:id', ({ params }) => HttpResponse.json({ id: params.id })),
  http.post('/api/v1/items', async ({ request }) => HttpResponse.json(await request.json())),
  http.put('/api/v1/items/:id', async ({ request, params }) =>
    HttpResponse.json({ ...(await request.json()), id: params.id })
  ),
  http.delete('/api/v1/items/:id', ({ params }) => HttpResponse.json({ id: params.id }))
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

describe('useCRUDapi', () => {
  it('should throw an error if unsupported method is used', async () => {
    const { getAll } = useCRUDapi('/api/items', [CRUD.READ_ONE])
    await expect(getAll()).rejects.toThrowError('Method GET_ALL is not supported')

    const { getOne } = useCRUDapi('/api/items', [CRUD.CREATE_ONE])
    await expect(getOne()).rejects.toThrowError('Method GET_ONE is not supported')

    const { createOne } = useCRUDapi('/api/items', [CRUD.READ_ONE])
    await expect(createOne()).rejects.toThrowError('Method POST is not supported')

    const { updateOne } = useCRUDapi('/api/items', [CRUD.READ_ONE])
    await expect(updateOne()).rejects.toThrowError('Method PUT is not supported')

    const { deleteOne } = useCRUDapi('/api/items', [CRUD.READ_ONE])
    await expect(deleteOne()).rejects.toThrowError('Method DELETE is not supported')
  })

  it('should run GET request after getAll method', async () => {
    const { getAll } = useCRUDapi('items')
    const items = await getAll()

    expect(items).toEqual([{ id: 1 }, { id: 2 }])
  })

  it('should run GET request with ID after getOne method', async () => {
    const { getOne } = useCRUDapi('items')
    const item = await getOne('some_id')

    expect(item).toEqual({ id: 'some_id' })
  })

  it('should run POST request with passed data after createOne method', async () => {
    const { createOne } = useCRUDapi('items')
    const newItem = await createOne({ id: 1, name: 'test' })

    expect(newItem).toEqual({ id: 1, name: 'test' })
  })

  it('should run PUT request with passed data after updateOne method', async () => {
    const { updateOne } = useCRUDapi('items')
    const updatedItem = await updateOne('some_id', { name: 'updated item' })

    expect(updatedItem).toEqual({ id: 'some_id', name: 'updated item' })
  })

  it('should run DELETE request after deleteOne method', async () => {
    const { deleteOne } = useCRUDapi('items')
    const deletedItem = await deleteOne('some_id')

    expect(deletedItem).toEqual({ id: 'some_id' })
  })
})
