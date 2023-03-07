import Image from 'next/image'
import React from 'react'
import optionsIcon from 'public/assets/icon-vertical-ellipsis.svg'

const OptionIcon = () => (
    <div className="grid w-10 h-10 cursor-pointer place-content-center">
        <Image
            src={optionsIcon}
            alt="options icon"
            className="cursor-pointer"
        />
    </div>
)

export default OptionIcon
