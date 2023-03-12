import RoundedButton from '@/components/atoms/RoundedButton'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { boardsInfoSelector } from '@/store/DataSlice'
import { toggleAddBoard } from '@/store/EditModesSlice'
import { sidebarStatusSelector } from '@/store/UISlice'
import clsx from 'clsx'
import ColumnItem from '../ColumnItem'

const MainBoard: React.FC = () => {
    const dispatch = useAppDispatch()
    const { boardsArray, selectedBoardIndex } =
        useAppSelector(boardsInfoSelector)
    const sideBarStatus = useAppSelector(sidebarStatusSelector)
    const createNewBoardFunction = () => {
        dispatch(toggleAddBoard())
    }
    return (
        <section
            className={clsx(
                'mt-[64px] tablet:mt-[81px] h-full scrollbar-hide flex desktop:mt-[97px] overflow-scroll bg-light-grey dark:bg-very-dark-grey ',
                {
                    'tablet:ml-[300px]': sideBarStatus,
                }
            )}
        >
            {boardsArray.length > 0 ? (
                <div className="grid grid-flow-col auto-cols-[280px] gap-[24px] m-[24px] w-full h-full bg-light-grey dark:bg-very-dark-grey">
                    {boardsArray[selectedBoardIndex].columns.map(
                        (column, index) => (
                            <ColumnItem
                                key={index}
                                boardIndex={selectedBoardIndex}
                                columnIndex={index}
                                column={column}
                            />
                        )
                    )}
                </div>
            ) : (
                <div className="grid w-full h-screen mt-[-64px] tablet:mt-[-81px] desktop:mt-[-97px]  place-content-center">
                    <h1 className="self-center">
                        You don&apos;t have any boards. Create new one to get
                        started
                    </h1>
                    <div
                        className="mx-auto mt-[32px]"
                        onClick={createNewBoardFunction}
                    >
                        <RoundedButton variant="primary">
                            Create New Board
                        </RoundedButton>
                    </div>
                </div>
            )}
        </section>
    )
}

export default MainBoard
