import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
    currentStatusArraySelector,
    editedTaskSelector,
} from '@/store/DataSlice'
import { toggleViewTask } from '@/store/EditModesSlice'
import Image from 'next/image'
import React, { useEffect } from 'react'
import optionsIcon from 'public/assets/icon-vertical-ellipsis.svg'
import SubtaskCheckbox from '@/components/atoms/SubtaskCheckbox'
import DropDownMenu from '@/components/atoms/DropDownMenu'
import TaskOptionButton from '@/components/atoms/TaskOptionButton'
import clsx from 'clsx'

const ViewTaskWindow: React.FC = () => {
    const dispatch = useAppDispatch()
    const exitViewTask = () => {
        dispatch(toggleViewTask())
    }
    const {
        task: { description, status, subtasks, title },
    } = useAppSelector(editedTaskSelector)
    const statusObject = useAppSelector(currentStatusArraySelector)
    const allSubtasksQuantity = subtasks.length
    const completedSubtasks = subtasks.reduce((acc: number, cur) => {
        if (cur.isCompleted) acc++
        return acc
    }, 0)
    const everySubTaskCompleted = subtasks.every(
        (subtask) => subtask.isCompleted
    )

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'scroll'
        }
    })

    // TODO Fix overflow issue
    return (
        <div
            className="fixed top-0 left-0 bg-black/50 w-full min-h-screen px-[16px] grid place-content-center z-[100]"
            onClick={exitViewTask}
        >
            <div
                className={clsx(
                    '  rounded-md p-[32px] w-[calc(100vw-40px)] tablet:w-[480px]',
                    {
                        'bg-[#cdf9d5] dark:bg-[#284b35]': everySubTaskCompleted,
                        'bg-white dark:bg-dark-grey': !everySubTaskCompleted,
                    }
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between">
                    <h2 className="flex-grow text-black dark:text-white">
                        {title}
                    </h2>
                    <TaskOptionButton />
                </div>
                <div className="mt-[24px]">
                    {description === '' ? (
                        <p className="italic text-center large-text text-medium-gray">
                            No description
                        </p>
                    ) : (
                        <p className="text-justify large-text text-medium-gray">
                            {description}
                        </p>
                    )}
                </div>
                <div>
                    <p className="medium-text mt-[24px] text-medium-gray font-bold">{`Subtasks (${completedSubtasks} of ${allSubtasksQuantity})`}</p>
                    <div className="flex flex-col mt-[16px] space-y-[8px]">
                        {subtasks.map((subtask, index) => (
                            <SubtaskCheckbox
                                key={index}
                                subtaskIndex={index}
                                isCompleted={subtask.isCompleted}
                                label={subtask.title}
                            />
                        ))}
                    </div>
                    <div>
                        <p className="medium-text mt-[24px] text-medium-gray font-bold mb-[8px]">
                            Current Status
                        </p>
                        <DropDownMenu
                            array={statusObject.statusArray}
                            defaultIndex={statusObject.defaultArrayIndex}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewTaskWindow
