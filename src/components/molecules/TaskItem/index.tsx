import { useAppDispatch } from '@/hooks/redux'
import { setEditedTask } from '@/store/DataSlice'
import { toggleViewTask } from '@/store/EditModesSlice'
import { Task } from '@/types/DataTypes'
import clsx from 'clsx'
import React from 'react'

interface TaskItemProps extends Task {
    columnIndex: number
    taskIndex: number
    boardIndex: number
}

const TaskItem: React.FC<TaskItemProps> = ({
    title,
    subtasks,
    boardIndex,
    taskIndex,
    columnIndex,
}) => {
    const dispatch = useAppDispatch()
    const allSubtasksQuantity = subtasks.length
    const completedSubtasks = subtasks.reduce((acc: number, cur) => {
        if (cur.isCompleted) acc++
        return acc
    }, 0)
    const everySubtaskCompleted = subtasks.every(
        (subtask) => subtask.isCompleted
    )
    const setEditedTaskFunction = () => {
        const editedTask = {
            boardIndex,
            columnIndex,
            taskIndex,
        }
        dispatch(setEditedTask(editedTask))
        dispatch(toggleViewTask())
    }
    return (
        <div
            className={clsx(
                ' cursor-pointer dark:text-white flex flex-col space-y-[8px]  rounded-lg py-[23px] px-[16px]',
                {
                    'bg-[#0FFF5040] dark:bg-[#0FFF5030]': everySubtaskCompleted,
                    'bg-white dark:bg-dark-grey': !everySubtaskCompleted,
                }
            )}
            onClick={setEditedTaskFunction}
        >
            <h3 className="transition-none">{title}</h3>
            <p className="text-[12px] leading-[15px] text-medium-gray font-bold">{`${completedSubtasks} of ${allSubtasksQuantity} subtasks`}</p>
        </div>
    )
}

export default TaskItem
