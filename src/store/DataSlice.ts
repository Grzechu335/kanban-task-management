import { RootState } from './store'
import { Board } from '@/types/DataTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import data from '../data/data.json'
import { Root } from 'postcss'

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
        changeTaskColumn: (
            state,
            action: PayloadAction<{ index: number; value: string }>
        ) => {
            // Get actual edited task indexes
            const {
                boardIndex,
                columnIndex: actualColumnIndex,
                taskIndex,
            } = state.editedData
            const { index: newColumnIndex, value: newColumnName } =
                action.payload
            const selectedTask =
                state.data[boardIndex].columns[actualColumnIndex].tasks[
                    taskIndex
                ]

            // Changing status in task object
            selectedTask.status = newColumnName

            // Add task to new column
            state.data[boardIndex].columns[newColumnIndex].tasks.push(
                selectedTask
            )

            //Remove task from older column
            const updatedTasks = state.data[boardIndex].columns[
                actualColumnIndex
            ].tasks.filter((task) => task.status !== newColumnName)

            // update state
            state.data[boardIndex].columns[actualColumnIndex].tasks =
                updatedTasks
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
    },
})

export const {
    setEditedBoard,
    setEditedTask,
    toggleSubtask,
    changeTaskColumn,
    deleteSelectedBoard,
    deleteSelectedTask,
    addNewBoard,
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
            value: column.name,
            label: column.name,
            index,
        })
    )
    return {
        statusArray,
        defaultArrayIndex: columnIndex,
    }
}

export default DataSlice.reducer
