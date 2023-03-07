import RoundedButton from '@/components/atoms/RoundedButton'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { boardsInfoSelector, deleteSelectedBoard } from '@/store/DataSlice'
import { toggleDeleteBoard } from '@/store/EditModesSlice'
import React from 'react'

const DeleteBoardWindow: React.FC = () => {
    const dispatch = useAppDispatch()
    const { selectedBoardName, selectedBoardIndex } =
        useAppSelector(boardsInfoSelector)
    const exitDeleteBoardMode = () => {
        dispatch(toggleDeleteBoard())
    }
    const deleteBoard = () => {
        dispatch(deleteSelectedBoard(selectedBoardIndex))
        exitDeleteBoardMode()
    }

    return (
        <div className="fixed top-0 left-0 grid w-full h-full bg-black/50 place-content-center">
            <div className="bg-white rounded-lg dark:bg-dark-grey w-[calc(100vw-40px)] tablet:w-[480px] p-[32px] flex flex-col space-y-[24px]">
                <h2 className="text-red">Delete this board?</h2>
                <p className="text-justify large-text text-medium-gray ">
                    Are you sure you want to delete the{' '}
                    <span className="italic font-extrabold text-red-hover whitespace-nowrap">
                        {`${selectedBoardName}`}
                    </span>{' '}
                    board? This action will remove all columns and tasks and
                    cannot be reversed.
                </p>
                <div className="grid grid-cols-2 gap-[16px]">
                    <div
                        className="grid-cols-1"
                        onClick={deleteBoard}
                    >
                        <RoundedButton
                            variant="danger"
                            full
                        >
                            Delete
                        </RoundedButton>
                    </div>
                    <div onClick={exitDeleteBoardMode}>
                        <RoundedButton
                            variant="secondary"
                            full
                        >
                            Cancel
                        </RoundedButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteBoardWindow
