import ArrayTextField from '@/components/atoms/ArrayTextField'
import RoundedButton from '@/components/atoms/RoundedButton'
import TextField from '@/components/atoms/TextField'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
    boardsInfoSelector,
    currentStatusArraySelector,
    updateSelectedBoard,
} from '@/store/DataSlice'
import { toggleEditBoard } from '@/store/EditModesSlice'
import { EditBoardInputTypes } from '@/types/EditBoardInputTypes'
import React, { useEffect } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

const EditBoardWindow: React.FC = () => {
    const { selectedBoardName } = useAppSelector(boardsInfoSelector)
    const { statusArray } = useAppSelector(currentStatusArraySelector)
    const columnsArray = statusArray.map((col, index) => ({
        name: col.label,
        index,
    }))
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<EditBoardInputTypes>({
        defaultValues: {
            boardName: selectedBoardName,
            columns: columnsArray,
        },
    })

    const { fields, append, remove } = useFieldArray({
        name: 'columns',
        control,
    })

    const onSubmit: SubmitHandler<EditBoardInputTypes> = (data) => {
        const updatedBoardInfo = {
            updatedBoardName: data.boardName,
            updatedColumnsInfo: data.columns.map((column) => ({
                name: column.name,
                index: column.index,
            })),
        }
        console.log(updatedBoardInfo)
        dispatch(updateSelectedBoard(updatedBoardInfo))

        dispatch(toggleEditBoard())
    }

    const dispatch = useAppDispatch()
    const exitAddBoardWindow = () => {
        dispatch(toggleEditBoard())
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'scroll'
        }
    })

    return (
        <div
            className="fixed top-0 left-0 grid w-full h-full place-content-center bg-black/50"
            onClick={exitAddBoardWindow}
        >
            <form
                className="bg-white dark:bg-very-dark-grey w-[calc(100vw-40px)] tablet:w-[480px] mt-[30px] tablet:mt-0 rounded-md p-[32px] flex flex-col space-y-[24px]"
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <h2 className="text-black dark:text-white">Edit Board</h2>
                <div>
                    <p className="medium-text text-medium-gray mb-[8px]">
                        Name
                    </p>
                    <TextField
                        placeholder="e.g. Web Design"
                        {...register('boardName', {
                            required: 'Field cannot be empty',
                        })}
                        error={errors?.boardName}
                    />
                </div>
                <div>
                    <p className="medium-text text-medium-gray mb-[8px]">
                        Columns
                    </p>
                    <div className="flex space-y-[12px] flex-col max-h-[25vh] tablet:max-h-[30vh] overflow-y-scroll">
                        {fields.map((field, index) => (
                            <ArrayTextField
                                {...register(`columns.${index}.name` as const, {
                                    required: 'Field cannot be empty',
                                })}
                                error={errors?.columns?.[index]?.name}
                                key={field.id}
                                index={index}
                                remove={remove}
                            />
                        ))}
                    </div>
                </div>
                <div
                    onClick={() =>
                        append({
                            name: '',
                            index: 'new',
                        })
                    }
                >
                    <RoundedButton
                        variant="secondary"
                        full
                    >
                        + Add New Column
                    </RoundedButton>
                </div>
                <RoundedButton
                    variant="primary"
                    full
                    submit
                >
                    Save Changes
                </RoundedButton>
            </form>
        </div>
    )
}

export default EditBoardWindow
