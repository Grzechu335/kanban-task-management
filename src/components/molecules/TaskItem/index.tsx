import { useAppDispatch } from '@/hooks/redux'
import { setEditedTask } from '@/store/DataSlice'
import { Task } from '@/types/DataTypes'
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
    const setEditedTaskFunction = () => {
        const editedTask = {
            boardIndex,
            columnIndex,
            taskIndex,
        }
        dispatch(setEditedTask(editedTask))
    }
    return (
        <div
            className="bg-white cursor-pointer dark:text-white flex flex-col space-y-[8px] dark:bg-dark-grey rounded-lg py-[23px] px-[16px]"
            onClick={setEditedTaskFunction}
        >
            <h3 className="transition-none">{title}</h3>
            <p className="text-[12px] leading-[15px] text-medium-gray font-bold">{`${completedSubtasks} of ${allSubtasksQuantity} subtasks`}</p>
        </div>
    )
}

export default TaskItem
