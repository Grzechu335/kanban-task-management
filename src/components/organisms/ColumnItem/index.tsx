import TaskItem from '@/components/molecules/TaskItem'
import { Column } from '@/types/DataTypes'
import React from 'react'

type ColumnItemProps = {
    column: Column
    boardIndex: number
    columnIndex: number
}

const ColumnItem: React.FC<ColumnItemProps> = ({
    column,
    columnIndex,
    boardIndex,
}) => {
    const allTasksQuantity = column.tasks.length
    return (
        <div>
            <h4 className="uppercase text-medium-gray mb-[24px]">{`${column.name} (${allTasksQuantity})`}</h4>
            <div className="flex flex-col space-y-[20px]">
                {column.tasks.map((task, index) => (
                    <TaskItem
                        key={index}
                        boardIndex={boardIndex}
                        columnIndex={columnIndex}
                        taskIndex={index}
                        {...task}
                    />
                ))}
            </div>
        </div>
    )
}

export default ColumnItem
