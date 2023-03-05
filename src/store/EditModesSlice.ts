import { RootState } from './store'
import { createSlice } from '@reduxjs/toolkit'

interface EditMode {
    viewTask: boolean
    addBoard: boolean
    editBoard: boolean
    addTask: boolean
    editTask: boolean
    deleteBoard: boolean
    deleteTask: boolean
}

const initialState: EditMode = {
    viewTask: false,
    addBoard: false,
    editBoard: false,
    addTask: false,
    editTask: false,
    deleteBoard: false,
    deleteTask: false,
}

const EditModesSlice = createSlice({
    name: 'EditModeSlice',
    initialState,
    reducers: {
        toggleViewTask: (state) => {
            state.viewTask = !state.viewTask
        },
        toggleAddBoard: (state) => {
            state.addBoard = !state.addBoard
        },
        toggleEditBoard: (state) => {
            state.editBoard = !state.editBoard
        },
        toggleAddTask: (state) => {
            state.addTask = !state.addTask
        },
        toggleEditTask: (state) => {
            state.editTask = !state.editTask
        },
        toggleDeleteBoard: (state) => {
            state.deleteBoard = !state.deleteBoard
        },
        toggleDeleteTask: (state) => {
            state.deleteTask = !state.deleteTask
        },
    },
})

export const {
    toggleAddBoard,
    toggleAddTask,
    toggleDeleteBoard,
    toggleDeleteTask,
    toggleEditBoard,
    toggleEditTask,
    toggleViewTask,
} = EditModesSlice.actions

export const addBoardStatusSelector = (state: RootState) =>
    state.editModes.addBoard
export const addTaskStatusSelector = (state: RootState) =>
    state.editModes.addTask
export const deleteBoardStatusSelector = (state: RootState) =>
    state.editModes.deleteBoard
export const deleteTaskStatusSelector = (state: RootState) =>
    state.editModes.deleteTask
export const editBoardStatusSelector = (state: RootState) =>
    state.editModes.editBoard
export const editTaskStatusSelector = (state: RootState) =>
    state.editModes.editTask
export const viewTaskkStatusSelector = (state: RootState) =>
    state.editModes.viewTask

export default EditModesSlice.reducer
