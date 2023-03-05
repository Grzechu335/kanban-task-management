import { useAppSelector } from '@/hooks/redux'
import { mobileNavStatusSelector } from '@/store/UISlice'
import React from 'react'
import Header from '../organisms/Header'
import HeaderMobile from '../organisms/HeaderMobile'
import MobileNav from '../organisms/MobileNav'
import Sidebar from '../organisms/Sidebar'

const HomePageTemplate: React.FC = () => {
    const mobileNavStatus = useAppSelector(mobileNavStatusSelector)

    return (
        <div className="flex flex-col">
            <Header />
            <HeaderMobile />
            {mobileNavStatus && <MobileNav />}
            <Sidebar />
        </div>
    )
}

export default HomePageTemplate
