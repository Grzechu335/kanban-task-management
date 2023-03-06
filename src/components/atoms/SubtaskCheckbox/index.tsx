import { useAppDispatch } from '@/hooks/redux'
import { toggleSubtask } from '@/store/DataSlice'
import clsx from 'clsx'
import React from 'react'

type CustomCheckboxProps = {
    label: string
    isCompleted: boolean
    subtaskIndex: number
}

const SubtaskCheckbox = React.forwardRef<HTMLInputElement, CustomCheckboxProps>(
    (props, ref) => {
        const dispatch = useAppDispatch()
        const { label, isCompleted, subtaskIndex } = props
        const toggleSubtaskStatus = () => {
            dispatch(toggleSubtask(subtaskIndex))
        }
        return (
            <label
                className={clsx(
                    'rounded-[4px] medium-text inline-block w-full bg-light-grey dark:bg-very-dark-grey hover:bg-main-purple/25 hover:hover:bg-main-purple/25 p-[12px] cursor-pointer  font-bold',
                    {
                        'text-black/50 dark:text-white/50 line-through':
                            isCompleted,
                        'no-underline text-black dark:text-white': !isCompleted,
                    }
                )}
            >
                <input
                    className="cursor-pointer mr-[16px]"
                    type="checkbox"
                    ref={ref}
                    checked={isCompleted}
                    onChange={toggleSubtaskStatus}
                />
                {label}
            </label>
        )
    }
)

SubtaskCheckbox.displayName = 'CustomCheckbox'

export default SubtaskCheckbox
