import { RootState } from './store'
import { createSlice } from '@reduxjs/toolkit'

interface UIInterface {
    darkMode: boolean
    sidebar: boolean
    mobileNav: boolean
}

const initialState: UIInterface = {
    darkMode: false,
    mobileNav: false,
    sidebar: true,
}

const UISlice = createSlice({
    name: 'UISlice',
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode
        },
        toggleMobileNav: (state) => {
            state.mobileNav = !state.mobileNav
        },
        toggleSidebar: (state) => {
            state.sidebar = !state.sidebar
        },
    },
})

export const { toggleDarkMode, toggleMobileNav, toggleSidebar } =
    UISlice.actions

export const darkModeStatusSelector = (state: RootState) => state.ui.darkMode
export const mobileNavStatusSelector = (state: RootState) => state.ui.mobileNav
export const sidebarStatusSelector = (state: RootState) => state.ui.sidebar

export default UISlice.reducer
