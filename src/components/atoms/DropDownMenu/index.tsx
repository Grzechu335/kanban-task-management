import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { changeTaskColumn } from '@/store/DataSlice'
import { toggleViewTask } from '@/store/EditModesSlice'
import { darkModeStatusSelector } from '@/store/UISlice'
import React from 'react'
import Select, { StylesConfig } from 'react-select'
type DropDownProps = {
    array: {
        value: string
        label: string
        index: number
    }[]
    defaultIndex: number
}

interface Options {
    value: string
    label: string
    index: number
}

const DropDownMenu: React.FC<DropDownProps> = ({ array, defaultIndex }) => {
    const dispatch = useAppDispatch()
    const setDifferentStatusFunction = ({
        index,
        value,
    }: {
        value: string
        label: string
        index: number
    }) => {
        // If new column is same as previous column return function
        if (defaultIndex === index) return
        // Else continue
        dispatch(changeTaskColumn({ index, value }))
        dispatch(toggleViewTask())
    }
    const darkMode = useAppSelector(darkModeStatusSelector)
    const customStyles: StylesConfig = {
        singleValue: (styles) => ({
            ...styles,
            color: darkMode ? '#FFF' : '#000',
        }),
        dropdownIndicator: (styles) => ({
            ...styles,
            color: '#635FC7',
        }),
        indicatorSeparator: () => ({}),
        menu: (styles) => ({
            ...styles,
            // position: 'static',
            boxShadow: '0',
            borderRadius: '8px',
            backgroundColor: darkMode ? '#20212C' : '#fff',
            paddingTop: '16px',
            paddingBottom: '16px',
        }),
        control: (styles, state) => ({
            ...styles,
            boxShadow: 'none',
            backgroundColor: darkMode ? '#2B2C37' : '#FFF',
            borderColor: state.isFocused ? '#635FC7' : '#828FA3',
            fontSize: '13px',
            fontWeight: '500',
            lineHeight: '23px',
            '&:hover': {
                borderColor: '#635FC7',
                cursor: 'pointer',
            },
        }),

        option: (styles) => ({
            ...styles,
            fontSize: '13px',
            fontWeight: '500',
            lineHeight: '23px',
            color: darkMode ? '#fff' : '#00000050',
            background: 'none',
            '&:hover': {
                cursor: 'pointer',
                color: '#635FC7',
            },
        }),
    }
    return (
        <div className="w-full">
            <Select
                options={array}
                defaultValue={array[defaultIndex]}
                styles={customStyles}
                isSearchable={false}
                onChange={setDifferentStatusFunction}
                // TODO: fix typescript
            />
        </div>
    )
}

export default DropDownMenu
