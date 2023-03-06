import { useAppSelector } from '@/hooks/redux'
import { boardsInfoSelector } from '@/store/DataSlice'
import { sidebarStatusSelector } from '@/store/UISlice'
import clsx from 'clsx'
import ColumnItem from '../ColumnItem'

const MainBoard: React.FC = () => {
    const { boardsArray, selectedBoardIndex } =
        useAppSelector(boardsInfoSelector)
    const sideBarStatus = useAppSelector(sidebarStatusSelector)
    return (
        <section
            id="mainBoard"
            className={clsx(
                'mt-[64px] tablet:mt-[81px] min-h-screen  scrollbar-hide desktop:mt-[97px] overflow-scroll bg-light-grey dark:bg-very-dark-grey ',
                {
                    'tablet:ml-[300px]': sideBarStatus,
                }
            )}
        >
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
        </section>
    )
}

export default MainBoard
