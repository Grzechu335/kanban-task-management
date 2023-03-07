import HeaderOptionButton from '@/components/atoms/HeaderOptionButton'
import RoundedButton from '@/components/atoms/RoundedButton'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { boardsInfoSelector } from '@/store/DataSlice'
import { mobileNavStatusSelector, toggleMobileNav } from '@/store/UISlice'
import Image from 'next/image'
import mobileAddTaskIcon from 'public/assets/icon-add-task-mobile.svg'
import arrowDownIcon from 'public/assets/icon-chevron-down.svg'
import arrowUpIcon from 'public/assets/icon-chevron-up.svg'
import mobileLogo from 'public/assets/logo-mobile.svg'
import React from 'react'

const HeaderMobile: React.FC = () => {
    const { selectedBoardName } = useAppSelector(boardsInfoSelector)
    const mobileNavStatus = useAppSelector(mobileNavStatusSelector)
    const dispatch = useAppDispatch()
    const toggleMobileNavFunction = () => {
        dispatch(toggleMobileNav())
    }
    return (
        <header className="bg-white tablet:hidden h-[64px] fixed top-0 left-0 w-full flex justify-between items-center px-[16px] dark:bg-dark-grey">
            <div
                className="flex items-center space-x-[16px]"
                onClick={toggleMobileNavFunction}
            >
                <Image
                    src={mobileLogo}
                    alt="mobile logo"
                />
                <div className="flex items-center">
                    <h2 className="text-black dark:text-white">
                        {selectedBoardName}
                    </h2>
                    {mobileNavStatus ? (
                        <Image
                            src={arrowUpIcon}
                            alt="show mobile nav"
                            className="ml-[8px]"
                        />
                    ) : (
                        <Image
                            src={arrowDownIcon}
                            alt="hide mobile nav"
                            className="ml-[8px]"
                        />
                    )}
                </div>
            </div>
            <div className="flex items-center space-x-[16px]">
                <RoundedButton
                    variant="primary"
                    size="small"
                >
                    <Image
                        src={mobileAddTaskIcon}
                        alt="add task icon"
                    />
                </RoundedButton>
                <HeaderOptionButton />
            </div>
        </header>
    )
}

export default HeaderMobile
