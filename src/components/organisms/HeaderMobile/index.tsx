import HeaderOptionButton from '@/components/atoms/HeaderOptionButton'
import RoundedButton from '@/components/atoms/RoundedButton'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { boardsInfoSelector } from '@/store/DataSlice'
import { toggleAddTask } from '@/store/EditModesSlice'
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
    const toggleAddTaskFunction = () => {
        dispatch(toggleAddTask())
    }
    return (
        <header className="bg-white tablet:hidden h-[64px]  fixed top-0 left-0 w-full flex justify-between items-center px-[16px] dark:bg-dark-grey">
            <div
                className="flex items-center space-x-[16px] flex-grow overflow-hidden"
                onClick={toggleMobileNavFunction}
            >
                <Image
                    src={mobileLogo}
                    alt="mobile logo"
                />
                <div className="flex items-center w-full">
                    <h2 className="text-black truncate dark:text-white">
                        {selectedBoardName}
                    </h2>
                    <div className="mx-[16px]">
                        {mobileNavStatus ? (
                            <Image
                                src={arrowUpIcon}
                                alt="show mobile nav"
                            />
                        ) : (
                            <Image
                                src={arrowDownIcon}
                                alt="hide mobile nav"
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-[16px] flex-shrink-0 ml-[16px]">
                <div onClick={toggleAddTaskFunction}>
                    <RoundedButton
                        variant="primary"
                        size="small"
                    >
                        <Image
                            src={mobileAddTaskIcon}
                            alt="add task icon"
                        />
                    </RoundedButton>
                </div>
                <HeaderOptionButton />
            </div>
        </header>
    )
}

export default HeaderMobile
