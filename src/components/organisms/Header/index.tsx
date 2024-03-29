import RoundedButton from '@/components/atoms/RoundedButton'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { boardsInfoSelector } from '@/store/DataSlice'
import { darkModeStatusSelector, sidebarStatusSelector } from '@/store/UISlice'
import clsx from 'clsx'
import React from 'react'
import optionsIcon from 'public/assets/icon-vertical-ellipsis.svg'
import Image from 'next/image'
import lightModeLogo from 'public/assets/logo-dark.svg'
import darkModeLogo from 'public/assets/logo-light.svg'
import HeaderOptionButton from '@/components/atoms/HeaderOptionButton'
import { toggleAddTask, toggleEditBoard } from '@/store/EditModesSlice'

const Header: React.FC = () => {
    const dispatch = useAppDispatch()
    const { selectedBoardName } = useAppSelector(boardsInfoSelector)
    const sidebarStatus = useAppSelector(sidebarStatusSelector)
    const darkModeStatus = useAppSelector(darkModeStatusSelector)
    const toggleAddTaskFunction = () => {
        dispatch(toggleAddTask())
    }

    return (
        <header
            className={clsx(
                'border-b hidden tablet:flex px-[24px]  items-center fixed top-0 border-b-lines-light dark:border-b-lines-dark tablet:h-[81px]  desktop:h-[97px] bg-white dark:bg-dark-grey',
                {
                    'left-[300px] w-[calc(100%-300px)]': sidebarStatus,
                    'left-0 w-full': !sidebarStatus,
                }
            )}
        >
            <div className="flex items-center h-full">
                {!sidebarStatus && (
                    <div className="border-r flex items-center pr-[32px] h-full border-r-lines-light dark:border-r-lines-dark">
                        {darkModeStatus ? (
                            <Image
                                src={darkModeLogo}
                                alt="dark mode logo"
                            />
                        ) : (
                            <Image
                                src={lightModeLogo}
                                alt="light mode logo"
                            />
                        )}
                    </div>
                )}
            </div>
            <div className="flex-grow overflow-hidden">
                <h1
                    className={clsx('truncate', {
                        'tablet:pl-[32px]': !sidebarStatus,
                    })}
                >
                    {selectedBoardName}
                </h1>
            </div>
            <div className="flex items-center space-x-[24px] ml-5 flex-shrink-0">
                <div onClick={toggleAddTaskFunction}>
                    <RoundedButton
                        variant="primary"
                        size="small"
                    >
                        + Add New Task
                    </RoundedButton>
                </div>
                <HeaderOptionButton />
            </div>
        </header>
    )
}

export default Header
