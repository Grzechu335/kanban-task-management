import clsx from 'clsx'
import React from 'react'
import { FieldError, FieldErrors } from 'react-hook-form'

type TextFieldProps = {
    placeholder: string
    error?: FieldError
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
    (props, ref) => {
        const { placeholder, error, ...formProps } = props
        return (
            <label className="rounded h-[40px] leading-[40px]  text-body-large flex items-center relative">
                <input
                    {...formProps}
                    ref={ref}
                    type="text"
                    className={clsx(
                        'px-[16px] large-text border-medium-gray/25 placeholder:text-black/25 dark:placeholder:text-white/25  border outline-none w-full rounded bg-transparent bg-white dark:bg-dark-grey text-black dark:text-white  leading-[40px]',
                        {
                            'border-red': error,
                        }
                    )}
                    placeholder={placeholder}
                />
                {error && (
                    <span className="block absolute large-text leading-[40px] text-red right-[16px]">
                        {error?.message}
                    </span>
                )}
            </label>
        )
    }
)

TextField.displayName = 'TextField'

export default TextField
