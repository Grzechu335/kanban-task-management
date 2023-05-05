import { combineReducers, configureStore, createStore } from '@reduxjs/toolkit'
import DataSliceReducer from './DataSlice'
import EditModesSliceReducer from './EditModesSlice'
import UISliceReducer from './UISlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['data'],
}

const rootReducer = combineReducers({
    data: DataSliceReducer,
    ui: UISliceReducer,
    editModes: EditModesSliceReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)

export const persistor = persistStore(store)

// const store = configureStore({
//     reducer: {

//     },
// })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
