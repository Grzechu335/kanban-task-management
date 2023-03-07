import clsx from 'clsx'
import React, { ReactNode } from 'react'

interface RoundedButtonProps {
    variant: 'primary' | 'secondary' | 'danger'
    size?: 'large' | 'small'
    submit?: boolean
    children?: ReactNode
    full?: boolean
}

const RoundedButton: React.FC<RoundedButtonProps> = ({
    submit = false,
    size = 'small',
    variant,
    children,
    full = false,
}) => {
    return (
        <button
            type={submit ? 'submit' : 'button'}
            className={clsx(
                'rounded-full cursor-pointer px-[18px] tablet:px-[24px] flex justify-center items-center ',
                {
                    'h-[48px] py-[15px] leading-[48px] ': size === 'large',
                    'h-[32px] tablet:h-[40px] py-[8px] leading-[32px] tablet:leading-[40px]':
                        size === 'small',
                    'bg-main-purple hover:bg-main-purple-hover text-white':
                        variant === 'primary',
                    'bg-main-purple/10 hover:bg-main-purple-hover/25 dark:bg-white dark:text-main-purple dark:hover:bg-main-purple-hover/90 text-main-purple':
                        variant === 'secondary',
                    'bg-red hover:bg-red-hover text-white':
                        variant === 'danger',
                    'w-full': full,
                }
            )}
        >
            <h3>{children}</h3>
        </button>
    )
}

export default RoundedButton
