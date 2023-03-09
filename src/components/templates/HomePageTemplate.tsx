import { useAppSelector } from '@/hooks/redux'
import {
    addBoardStatusSelector,
    addTaskStatusSelector,
    deleteBoardStatusSelector,
    deleteTaskStatusSelector,
    editBoardStatusSelector,
    editTaskStatusSelector,
    toggleDeleteBoard,
    viewTaskStatusSelector,
} from '@/store/EditModesSlice'
import {
    darkModeStatusSelector,
    mobileNavStatusSelector,
} from '@/store/UISlice'
import React, { useEffect } from 'react'
import AddBoardWindow from '../organisms/AddBoardWindow'
import AddTaskWindow from '../organisms/AddTaskWindow'
import DeleteBoardWindow from '../organisms/DeleteBoardWindow'
import DeleteTaskWindow from '../organisms/DeleteTaskWindow'
import EditBoardWindow from '../organisms/EditBoardWindow'
import EditTaskWindow from '../organisms/EditTaskWindow'
import Header from '../organisms/Header'
import HeaderMobile from '../organisms/HeaderMobile'
import MainBoard from '../organisms/MainBoard'
import MobileNav from '../organisms/MobileNav'
import Sidebar from '../organisms/Sidebar'
import ViewTaskWindow from '../organisms/ViewTaskWindow'

const HomePageTemplate: React.FC = () => {
    const mobileNavStatus = useAppSelector(mobileNavStatusSelector)
    const viewTaskMode = useAppSelector(viewTaskStatusSelector)
    const darkMode = useAppSelector(darkModeStatusSelector)
    const deleteBoardMode = useAppSelector(deleteBoardStatusSelector)
    const deleteTaskMode = useAppSelector(deleteTaskStatusSelector)
    const addBoardMode = useAppSelector(addBoardStatusSelector)
    const editTaskMode = useAppSelector(editTaskStatusSelector)
    const addTaskMode = useAppSelector(addTaskStatusSelector)
    const editBoardMode = useAppSelector(editBoardStatusSelector)
    useEffect(() => {
        darkMode
            ? (document.body.style.backgroundColor = '#20212C')
            : (document.body.style.backgroundColor = '#F4F7FD')
    }, [darkMode])
    return (
        <div
            className={`flex flex-col   ${
                darkMode ? 'bg-very-dark-grey' : 'bg-light-grey'
            }`}
        >
            <Header />
            <HeaderMobile />
            {mobileNavStatus && <MobileNav />}
            <MainBoard />
            <Sidebar />
            {viewTaskMode && <ViewTaskWindow />}
            {deleteBoardMode && <DeleteBoardWindow />}
            {deleteTaskMode && <DeleteTaskWindow />}
            {addBoardMode && <AddBoardWindow />}
            {editTaskMode && <EditTaskWindow />}
            {addTaskMode && <AddTaskWindow />}
            {editBoardMode && <EditBoardWindow />}
        </div>
    )
}

export default HomePageTemplate
