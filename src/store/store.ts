import { configureStore } from '@reduxjs/toolkit'
import DataSliceReducer from './DataSlice'
import EditModesSliceReducer from './EditModesSlice'
import UISliceReducer from './UISlice'

const store = configureStore({
    reducer: {
        data: DataSliceReducer,
        ui: UISliceReducer,
        editModes: EditModesSliceReducer,
    },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
