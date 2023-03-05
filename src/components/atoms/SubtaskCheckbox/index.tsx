import clsx from 'clsx'
import React from 'react'

type CustomCheckboxProps = {
    label: string
    isCompleted: boolean
}

const SubtaskCheckbox = React.forwardRef<HTMLInputElement, CustomCheckboxProps>(
    (props, ref) => {
        const { label, isCompleted } = props
        return (
            <label
                className={clsx(
                    'rounded-[4px] inline-block w-[350px] bg-light-grey dark:bg-very-dark-grey hover:bg-main-purple/25 hover:hover:bg-main-purple/25 p-[12px] cursor-pointer  font-bold',
                    {
                        'text-white/50 line-through': isCompleted,
                        'no-underline text-black dark:text-white': !isCompleted,
                    }
                )}
            >
                <input
                    className="cursor-pointer mr-[16px]"
                    type="checkbox"
                    ref={ref}
                />
                {label}
            </label>
        )
    }
)

SubtaskCheckbox.displayName = 'CustomCheckbox'

export default SubtaskCheckbox
