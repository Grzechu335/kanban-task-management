import { useAppSelector } from '@/hooks/redux'
import {
    darkModeStatusSelector,
    mobileNavStatusSelector,
} from '@/store/UISlice'
import React, { useEffect } from 'react'
import Header from '../organisms/Header'
import HeaderMobile from '../organisms/HeaderMobile'
import MainBoard from '../organisms/MainBoard'
import MobileNav from '../organisms/MobileNav'
import Modals from '../organisms/Modals'
import Sidebar from '../organisms/Sidebar'

const HomePageTemplate: React.FC = () => {
    const mobileNavStatus = useAppSelector(mobileNavStatusSelector)
    const darkMode = useAppSelector(darkModeStatusSelector)
    useEffect(() => {
        darkMode
            ? (document.body.style.backgroundColor = '#20212C')
            : (document.body.style.backgroundColor = '#F4F7FD')
    }, [darkMode])
    return (
        <div
            className={`flex flex-col h-full  ${
                darkMode ? 'bg-very-dark-grey' : 'bg-light-grey'
            }`}
        >
            <Header />
            <HeaderMobile />
            {mobileNavStatus && <MobileNav />}
            <MainBoard />
            <Sidebar />
            <Modals />
        </div>
    )
}

export default HomePageTemplate
