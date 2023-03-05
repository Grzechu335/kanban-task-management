import { RootState } from './store'
import { Board } from '@/types/DataTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import data from '../data/data.json'

interface DataInterface {
    data: Board[]
    editedData: {
        boardIndex: number
        columnIndex: number
        taskIndex: number
        subTaskIndex: number
    }
}

const initialState: DataInterface = {
    data: data.boards,
    editedData: {
        boardIndex: 0,
        columnIndex: 0,
        taskIndex: 0,
        subTaskIndex: 0,
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
    },
})

export const { setEditedBoard } = DataSlice.actions

export const boardsInfoSelector = (state: RootState) => {
    const selectedBoardIndex = state.data.editedData.boardIndex

    return {
        boardsQuantity: state.data.data.length,
        boardsArray: state.data.data,
        selectedBoardIndex,
        selectedBoardName: state.data.data[selectedBoardIndex].name,
    }
}

export default DataSlice.reducer
