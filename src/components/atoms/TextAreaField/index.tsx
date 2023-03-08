import clsx from 'clsx'
import React from 'react'
import { FieldError, FieldErrors } from 'react-hook-form'

type TextAreaProps = {
    placeholder?: string
    error?: FieldError
}

const TextAreaField = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (props, ref) => {
        const { placeholder, error, ...formProps } = props
        return (
            <label className="rounded max-h-[112px] leading-[40px] overflow-y-scroll  text-body-large flex items-center relative">
                <textarea
                    {...formProps}
                    ref={ref}
                    className={clsx(
                        'px-[16px] large-text border-medium-gray/25 placeholder:text-black/25 dark:placeholder:text-white/25  border outline-none w-full rounded bg-transparent bg-white dark:bg-dark-grey text-black dark:text-white',
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

TextAreaField.displayName = 'TextField'

export default TextAreaField
