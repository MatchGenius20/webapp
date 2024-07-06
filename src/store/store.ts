import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { ThunkAction } from 'redux-thunk'
import themeReducer from './reducers/themeReducer'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
