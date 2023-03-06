import { useAppSelector } from '@/hooks/redux'
import { viewTaskkStatusSelector } from '@/store/EditModesSlice'
import {
    darkModeStatusSelector,
    mobileNavStatusSelector,
} from '@/store/UISlice'
import React, { useEffect } from 'react'
import Header from '../organisms/Header'
import HeaderMobile from '../organisms/HeaderMobile'
import MainBoard from '../organisms/MainBoard'
import MobileNav from '../organisms/MobileNav'
import Sidebar from '../organisms/Sidebar'
import ViewTaskWindow from '../organisms/ViewTaskWindow'

const HomePageTemplate: React.FC = () => {
    const mobileNavStatus = useAppSelector(mobileNavStatusSelector)
    const viewTaskMode = useAppSelector(viewTaskkStatusSelector)
    const darkMode = useAppSelector(darkModeStatusSelector)
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
        </div>
    )
}

export default HomePageTemplate
