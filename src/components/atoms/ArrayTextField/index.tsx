import clsx from 'clsx'
import React from 'react'

type TextFieldProps = {
    placeholder: string
    error?: boolean
}

const ArrayTextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
    (props, ref) => {
        const { placeholder, error } = props
        return (
            <label className="rounded h-[40px] leading-[40px]  text-body-large flex items-center relative">
                <input
                    type="text"
                    className={clsx(
                        'px-[16px] border-medium-gray/25 placeholder:text-black/25  border outline-none w-[350px] rounded bg-transparent bg-white dark:bg-dark-grey text-black dark:text-white  leading-[40px]',
                        {
                            'border-red': error,
                        }
                    )}
                    placeholder={placeholder}
                />
                {error && (
                    <span className="block absolute text-body-large leading-[40px] text-red right-[16px]">
                        Error kurwa!
                    </span>
                )}
            </label>
        )
    }
)

ArrayTextField.displayName = 'TextField'

export default ArrayTextField
