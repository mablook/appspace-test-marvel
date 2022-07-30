import { configureStore } from '@reduxjs/toolkit'
import characters from '../__marvel__/character/collection-slice'
import characterItem from '../__marvel__/character/item-slice'

export const store = configureStore({
  reducer: {
    characters,
    characterItem
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
