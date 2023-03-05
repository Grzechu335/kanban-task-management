import React from 'react'
import Select, { StylesConfig } from 'react-select'
type DropDownProps = {
    array: {
        value: string
        label: string
    }[]
}

const DropDownMenu: React.FC<DropDownProps> = ({ array }) => {
    const darkMode = false
    const customStyles: StylesConfig = {
        dropdownIndicator: (styles) => ({
            ...styles,
            color: '#635FC7',
        }),
        indicatorSeparator: () => ({}),
        menu: (styles) => ({
            ...styles,
            boxShadow: '0',
            borderRadius: '8px',
            backgroundColor: darkMode ? '#20212C' : '#fff',
            paddingTop: '16px',
            paddingBottom: '16px',
        }),
        control: (styles, state) => ({
            ...styles,
            boxShadow: 'none',
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
        <div className="w-[350px]">
            <Select
                options={array}
                defaultValue={array[0]}
                styles={customStyles}
            />
        </div>
    )
}

export default DropDownMenu
