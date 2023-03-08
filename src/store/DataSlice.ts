import { Board, Task } from '@/types/DataTypes'
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import data from '../data/data.json'
import { RootState } from './store'

interface DataInterface {
    data: Board[]
    editedData: {
        boardIndex: number
        columnIndex: number
        taskIndex: number
    }
}

const initialState: DataInterface = {
    data: data.boards,
    editedData: {
        boardIndex: 0,
        columnIndex: 0,
        taskIndex: 0,
    },
}
const DataSlice = createSlice({
    name: 'DataSlice',
    initialState,
    reducers: {
        setEditedBoard: (state, action: PayloadAction<number>) => {
            const selectedBoardIndex = action.payload
            state.editedData.boardIndex = selectedBoardIndex
        },
        setEditedTask: (
            state,
            action: PayloadAction<{
                boardIndex: number
                columnIndex: number
                taskIndex: number
            }>
        ) => {
            const { boardIndex, columnIndex, taskIndex } = action.payload
            return {
                ...state,
                editedData: {
                    ...state.editedData,
                    boardIndex,
                    columnIndex,
                    taskIndex,
                },
            }
        },
        toggleSubtask: (state, action: PayloadAction<number>) => {
            const subtaskIndex = action.payload
            const { boardIndex, columnIndex, taskIndex } = state.editedData
            const actualSubtaskState =
                state.data[boardIndex].columns[columnIndex].tasks[taskIndex]
                    .subtasks[subtaskIndex].isCompleted
            // Updating state
            state.data[boardIndex].columns[columnIndex].tasks[
                taskIndex
            ].subtasks[subtaskIndex].isCompleted = !actualSubtaskState
        },
        deleteSelectedTask: (state, action: PayloadAction<number>) => {
            const { boardIndex, columnIndex, taskIndex } = state.editedData
            const selectedTaskIndex = action.payload
            // Remove task from tasks array
            const updatedTasks = state.data[boardIndex].columns[
                columnIndex
            ].tasks.filter((task, index) => index !== selectedTaskIndex)
            // Update state
            state.data[boardIndex].columns[columnIndex].tasks = updatedTasks
        },
        deleteSelectedBoard: (state, action: PayloadAction<number>) => {
            const { boardIndex } = state.editedData
            const selectedBoardIndex = action.payload
            // Remove board from boards array
            const updatedBoards = state.data.filter(
                (board, index) => index !== selectedBoardIndex
            )
            // Update state
            state.data = updatedBoards
            // Change edited board to first in array
            state.editedData.boardIndex = 0
        },
        addNewBoard: (
            state,
            action: PayloadAction<{
                name: string
                columns: {
                    name: string
                }[]
            }>
        ) => {
            const newBoardParams = action.payload
            const newBoardObject: Board = {
                name: newBoardParams.name,
                columns: newBoardParams.columns.map((column) => ({
                    name: column.name,
                    tasks: [],
                })),
            }
            state.data.push(newBoardObject)
        },
        updateSelectedTask: (
            state,
            action: PayloadAction<{
                task: Task
                updatedColumnIndex: number
            }>
        ) => {
            // Parameters from action
            const { updatedColumnIndex, task } = action.payload

            // Actual edited task indexes
            const {
                boardIndex,
                columnIndex: actualColumnIndex,
                taskIndex: actualTaskIndex,
            } = state.editedData

            // If column ID wasnt changed
            if (actualColumnIndex === updatedColumnIndex) {
                // Spread updated task in previous column
                state.data[boardIndex].columns[actualColumnIndex].tasks[
                    actualTaskIndex
                ] = { ...task }
                // If column ID was changed
            } else {
                // Add task to new column
                state.data[boardIndex].columns[updatedColumnIndex].tasks.push(
                    task
                )
                // Filter previous column from old task
                const updatedTasks = state.data[boardIndex].columns[
                    actualColumnIndex
                ].tasks.filter((_, index) => index !== actualTaskIndex)
                // Update state
                state.data[boardIndex].columns[actualColumnIndex].tasks =
                    updatedTasks
            }
        },
    },
})

export const {
    setEditedBoard,
    setEditedTask,
    toggleSubtask,
    deleteSelectedBoard,
    deleteSelectedTask,
    addNewBoard,
    updateSelectedTask,
} = DataSlice.actions

export const boardsInfoSelector = (state: RootState) => {
    const selectedBoardIndex = state.data.editedData.boardIndex
    return {
        boardsQuantity: state?.data?.data?.length,
        boardsArray: state?.data?.data,
        selectedBoardIndex,
        selectedBoardName: state?.data?.data[selectedBoardIndex]?.name,
    }
}

export const editedDataIndexesSelector = (state: RootState) =>
    state.data.editedData

export const editedTaskSelector = (state: RootState) => {
    const { boardIndex, columnIndex, taskIndex } = state.data.editedData
    // return state.data.data[boardIndex].columns[columnIndex].tasks[taskIndex]
    return {
        task: state.data.data[boardIndex].columns[columnIndex].tasks[taskIndex],
        taskIndex,
    }
}

export const currentStatusArraySelector = (state: RootState) => {
    const { boardIndex, columnIndex } = state.data.editedData
    const statusArray = state.data.data[boardIndex].columns.map(
        (column, index) => ({
            value: index,
            label: column.name,
        })
    )
    return {
        statusArray,
        defaultArrayIndex: columnIndex,
    }
}

export default DataSlice.reducer
