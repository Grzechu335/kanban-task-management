import ThemeSwitcher from '@/components/atoms/ThemeSwitcher'
import Navigation from '@/components/molecules/Navigation'
import { useAppDispatch } from '@/hooks/redux'
import { toggleMobileNav } from '@/store/UISlice'
import React, { useEffect } from 'react'

const MobileNav: React.FC = () => {
    const dispatch = useAppDispatch()

    const toggleMobileNavFunction = () => {
        dispatch(toggleMobileNav())
    }
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'scroll'
        }
    })
    return (
        <div
            className="bg-black/50 tablet:hidden fixed left-0 top-0 w-screen h-screen px-[54px]"
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
