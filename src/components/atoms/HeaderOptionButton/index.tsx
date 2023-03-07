import { useAppDispatch } from '@/hooks/redux'
import { toggleDeleteBoard } from '@/store/EditModesSlice'
import { Menu, MenuItem } from '@szhsin/react-menu'
import OptionIcon from '../OptionIcon'
type Props = {}

const HeaderOptionButton = () => {
    const dispatch = useAppDispatch()
    const deleteBoardFunction = () => {
        dispatch(toggleDeleteBoard())
    }
    return (
        <Menu
            menuButton={OptionIcon}
            menuClassName="p-[10px] w-[200px] z-100 rounded-md large-text bg-light-grey dark:bg-very-dark-grey text-medium-gray border border-lines-light dark:border-lines-dark "
            direction="left"
        >
            <MenuItem className="my-[10px] rounded dark:hover:bg-dark-grey outline-none px-[10px] cursor-pointer text-black dark:text-white py-[6px]">
                Edit Board
            </MenuItem>
            <MenuItem
                className="my-[10px] rounded dark:hover:bg-dark-grey outline-none px-[10px] cursor-pointer text-red font-bold py-[6px]"
                onClick={deleteBoardFunction}
            >
                Delete board
            </MenuItem>
        </Menu>
    )
}

export default HeaderOptionButton
