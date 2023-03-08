import { useAppSelector } from '@/hooks/redux'
import { darkModeStatusSelector } from '@/store/UISlice'
import React from 'react'
import Select, { StylesConfig } from 'react-select'
type DropDownProps = {
    array: {
        value: number
        label: string
    }[]
    disabled?: boolean
    defaultValue: {
        value: number
        label: string
    }
    onChange?: () => void
}

const DropDownMenu = React.forwardRef<any, DropDownProps>((props, ref) => {
    const { disabled, array, defaultValue, onChange, ...otherProps } = props
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
                ref={ref}
                isDisabled={disabled}
                {...otherProps}
                options={array}
                styles={customStyles}
                isSearchable={false}
                defaultValue={defaultValue}
                onChange={onChange}
            />
        </div>
    )
})

DropDownMenu.displayName = 'DropDownMenu'

export default DropDownMenu
