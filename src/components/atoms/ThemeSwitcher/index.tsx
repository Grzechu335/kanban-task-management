import React from 'react'
import Switch from 'react-switch'
import lightThemeIcon from 'public/assets/icon-light-theme.svg'
import darkThemeIcon from 'public/assets/icon-dark-theme.svg'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { darkModeStatusSelector, toggleDarkMode } from '@/store/UISlice'
const ThemeSwitcher: React.FC = () => {
    const darkMode = useAppSelector(darkModeStatusSelector)
    const dispatch = useAppDispatch()
    const toggleMode = () => {
        dispatch(toggleDarkMode())
    }
    return (
        <div className="rounded-md bg-light-grey dark:bg-very-dark-grey py-[14px] flex space-x-[24px] items-center justify-center">
            <Image
                src={lightThemeIcon}
                alt="light theme icon"
            />
            <Switch
                onChange={toggleMode}
                checked={darkMode}
                checkedIcon={false}
                uncheckedIcon={false}
                height={20}
                width={40}
                handleDiameter={14}
                offColor="#635FC7"
                onColor="#635FC7"
            />
            <Image
                src={darkThemeIcon}
                alt="dark theme icon"
            />
        </div>
    )
}

export default ThemeSwitcher
