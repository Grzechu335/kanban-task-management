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
                'mt-[64px] tablet:mt-[81px] min-h-full scrollbar-hide flex desktop:mt-[97px] overflow-scroll bg-light-grey dark:bg-very-dark-grey ',
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
                <h1 className="self-center">
                    You don&apos;t have any boards. Create new one
                </h1>
            )}
        </section>
    )
}

export default MainBoard
