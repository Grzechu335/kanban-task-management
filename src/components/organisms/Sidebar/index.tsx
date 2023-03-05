import ThemeSwitcher from '@/components/atoms/ThemeSwitcher'
import Navigation from '@/components/molecules/Navigation'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
    darkModeStatusSelector,
    sidebarStatusSelector,
    toggleSidebar,
} from '@/store/UISlice'
import Image from 'next/image'
import lightModeLogo from 'public/assets/logo-dark.svg'
import darkModeLogo from 'public/assets/logo-light.svg'
import React from 'react'
import hideSidebarIcon from 'public/assets/icon-hide-sidebar.svg'
import showSidebarIcon from 'public/assets/icon-show-sidebar.svg'

const Sidebar: React.FC = () => {
    const dispatch = useAppDispatch()
    const darkMode = useAppSelector(darkModeStatusSelector)
    const sideBarStatus = useAppSelector(sidebarStatusSelector)
    const toggleSidebarFunction = () => {
        dispatch(toggleSidebar())
    }

    return (
        <>
            {sideBarStatus ? (
                <section className="hidden tablet:flex flex-col fixed left-0 top-0 h-full w-[300px] border-r border-r-lines-light bg-white dark:bg-dark-grey dark:border-r-lines-dark px-[34px] pb-[32px]">
                    <div className="tablet:h-[81px] desktop:h-[97px] flex items-center">
                        {darkMode ? (
                            <Image
                                alt="dark logo"
                                src={darkModeLogo}
                            />
                        ) : (
                            <Image
                                alt="light logo"
                                src={lightModeLogo}
                            />
                        )}
                    </div>
                    <Navigation />
                    <ThemeSwitcher />
                    <div
                        className="flex items-center space-x-[15px] mt-[8px] cursor-pointer"
                        onClick={toggleSidebarFunction}
                    >
                        <Image
                            alt="hide sidebar icon"
                            src={hideSidebarIcon}
                        />
                        <h3 className="text-medium-gray">Hide Sidebar</h3>
                    </div>
                </section>
            ) : (
                <div
                    className="hidden hover:bg-main-purple-hover tablet:flex absolute cursor-pointer  justify-center items-center left-0 bottom-[32px] bg-main-purple rounded-r-full w-[56px] h-[48px]"
                    onClick={toggleSidebarFunction}
                >
                    <Image
                        src={showSidebarIcon}
                        alt="show sidebar icon"
                    />
                </div>
            )}
        </>
    )
}

export default Sidebar
