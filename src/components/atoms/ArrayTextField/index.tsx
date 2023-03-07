import clsx from 'clsx'
import React from 'react'
import CrossIcon from 'public/assets/icon-cross.svg'
import Image from 'next/image'
import { FieldError } from 'react-hook-form'
interface TextFieldProps {
    placeholder?: string
    error?: FieldError
    remove: (index: number) => void
    index: number
}

const ArrayTextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
    (props, ref) => {
        const { placeholder, error, remove, index, ...formProps } = props
        return (
            <label className="rounded h-[40px] leading-[40px]  text-body-large flex items-center justify-between first:mt-[6px] last:mb-[6px]">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        ref={ref}
                        {...formProps}
                        className={clsx(
                            'px-[16px] border-medium-gray/25 flex-grow placeholder:text-black/25 dark:placeholder:text-white/25  border outline-none w-full rounded bg-transparent bg-white dark:bg-dark-grey text-black dark:text-white  leading-[40px] large-text',
                            {
                                'border-red': error,
                            }
                        )}
                        placeholder={placeholder}
                    />
                    {error && (
                        <span className="block z-[20] absolute large-text leading-[40px] text-red right-[20px] top-0">
                            {error?.message}
                        </span>
                    )}
                </div>
                <Image
                    src={CrossIcon}
                    alt="delete board"
                    className="ml-[16px] cursor-pointer"
                    onClick={() => remove(index)}
                />
            </label>
        )
    }
)

ArrayTextField.displayName = 'TextField'

export default ArrayTextField
