import RoundedButton from '@/components/atoms/RoundedButton'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { deleteSelectedTask, editedTaskSelector } from '@/store/DataSlice'
import { toggleDeleteTask, toggleViewTask } from '@/store/EditModesSlice'
import React from 'react'

const DeleteTaskWindow: React.FC = () => {
    const dispatch = useAppDispatch()
    const {
        task: { title },
        taskIndex,
    } = useAppSelector(editedTaskSelector)
    const exitDeleteTaskMode = () => {
        dispatch(toggleDeleteTask())
    }
    const deleteTask = () => {
        dispatch(deleteSelectedTask(taskIndex))
        exitDeleteTaskMode()
        dispatch(toggleViewTask())
    }

    return (
        <div className="fixed top-0 left-0 grid w-full h-full bg-black/50 place-content-center z-[100]">
            <div className="bg-white rounded-lg dark:bg-dark-grey w-[calc(100vw-40px)] tablet:w-[480px] p-[32px] flex flex-col space-y-[24px]">
                <h2 className="text-red">Delete this task?</h2>
                <p className="large-text text-medium-gray ">
                    Are you sure you want to delete the &nbsp;
                    <span className="italic font-extrabold text-red-hover">
                        {`${title}`}
                    </span>{' '}
                    &nbsp;task and its subtasks? This action cannot be reversed.
                </p>
                <div className="grid grid-cols-2 gap-[16px]">
                    <div
                        className="grid-cols-1"
                        onClick={deleteTask}
                    >
                        <RoundedButton
                            variant="danger"
                            full
                        >
                            Delete
                        </RoundedButton>
                    </div>
                    <div onClick={exitDeleteTaskMode}>
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

export default DeleteTaskWindow
