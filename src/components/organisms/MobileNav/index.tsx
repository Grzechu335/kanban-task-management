import ThemeSwitcher from '@/components/atoms/ThemeSwitcher'
import Navigation from '@/components/molecules/Navigation'
import { useAppDispatch } from '@/hooks/redux'
import React from 'react'
import { mobileNavStatusSelector, toggleMobileNav } from '@/store/UISlice'

const MobileNav: React.FC = () => {
    const dispatch = useAppDispatch()

    const toggleMobileNavFunction = () => {
        dispatch(toggleMobileNav())
    }
    return (
        <div
            className="bg-black/50 absolute left-0 top-0 w-full h-full  px-[54px]"
            onClick={toggleMobileNavFunction}
        >
            <div
                className="bg-white dark:bg-dark-grey flex flex-col space-y-[16px] w-full mt-[80px] py-[16px] px-[24px] overflow-hidden rounded-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <Navigation />
                <ThemeSwitcher />
            </div>
        </div>
    )
}

export default MobileNav
