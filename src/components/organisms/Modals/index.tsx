import { useAppSelector } from '@/hooks/redux'
import {
    addBoardStatusSelector,
    addTaskStatusSelector,
    deleteBoardStatusSelector,
    deleteTaskStatusSelector,
    editBoardStatusSelector,
    editTaskStatusSelector,
    viewTaskStatusSelector,
} from '@/store/EditModesSlice'
import {
    darkModeStatusSelector,
    mobileNavStatusSelector,
} from '@/store/UISlice'
import React from 'react'
import ViewTaskWindow from '../ViewTaskWindow'
import DeleteBoardWindow from '../DeleteBoardWindow'
import DeleteTaskWindow from '../DeleteTaskWindow'
import AddBoardWindow from '../AddBoardWindow'
import EditTaskWindow from '../EditTaskWindow'
import AddTaskWindow from '../AddTaskWindow'
import EditBoardWindow from '../EditBoardWindow'

const Modals: React.FC = () => {
    const viewTaskMode = useAppSelector(viewTaskStatusSelector)
    const deleteBoardMode = useAppSelector(deleteBoardStatusSelector)
    const deleteTaskMode = useAppSelector(deleteTaskStatusSelector)
    const addBoardMode = useAppSelector(addBoardStatusSelector)
    const editTaskMode = useAppSelector(editTaskStatusSelector)
    const addTaskMode = useAppSelector(addTaskStatusSelector)
    const editBoardMode = useAppSelector(editBoardStatusSelector)
    return (
        <>
            {viewTaskMode && <ViewTaskWindow />}
            {deleteBoardMode && <DeleteBoardWindow />}
            {deleteTaskMode && <DeleteTaskWindow />}
            {addBoardMode && <AddBoardWindow />}
            {editTaskMode && <EditTaskWindow />}
            {addTaskMode && <AddTaskWindow />}
            {editBoardMode && <EditBoardWindow />}
        </>
    )
}

export default Modals
