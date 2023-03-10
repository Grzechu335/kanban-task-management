import BoardItem from '@/components/atoms/BoardItem'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { boardsInfoSelector } from '@/store/DataSlice'
import { toggleAddBoard } from '@/store/EditModesSlice'
import React from 'react'

const Navigation: React.FC = () => {
    const { boardsArray, boardsQuantity, selectedBoardIndex } =
        useAppSelector(boardsInfoSelector)
    const dispatch = useAppDispatch()
    const toggleAddBoardFunction = () => {
        dispatch(toggleAddBoard())
    }
    return (
        <div className="flex flex-col flex-grow mt-[15px] ">
            <h4 className="uppercase text-medium-gray ">
                All boards {`(${boardsQuantity})`}
            </h4>
            <div className=" mt-[20px]">
                {boardsArray.map((board, index) => (
                    <BoardItem
                        key={index}
                        name={board.name}
                        boardIndex={index}
                        selected={index === selectedBoardIndex}
                    />
                ))}
                <div
                    className="flex items-center text-main-purple h-[48px] relative cursor-pointer"
                    onClick={toggleAddBoardFunction}
                >
                    <svg
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                        className="relative mr-[16px]"
                    >
                        <path
                            d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                            fill="#635FC7"
                        />
                    </svg>
                    <h3>+ Create New Board</h3>
                </div>
            </div>
        </div>
    )
}

export default Navigation
