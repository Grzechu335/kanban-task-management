import ArrayTextField from '@/components/atoms/ArrayTextField'
import RoundedButton from '@/components/atoms/RoundedButton'
import TextField from '@/components/atoms/TextField'
import { useAppDispatch } from '@/hooks/redux'
import { toggleAddBoard } from '@/store/EditModesSlice'
import { AddBoardInputTypes } from '@/types/AddBoardInputTypes'
import React from 'react'
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { addNewBoard } from '@/store/DataSlice'

const AddBoardWindow: React.FC = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<AddBoardInputTypes>({
        defaultValues: {
            columns: [
                {
                    name: 'Todo',
                },
                {
                    name: 'Doing',
                },
            ],
        },
    })

    const { fields, append, remove } = useFieldArray({
        name: 'columns',
        control,
    })

    const onSubmit: SubmitHandler<AddBoardInputTypes> = (data) => {
        const newBoard = {
            name: data.boardName,
            columns: data.columns,
        }
        dispatch(addNewBoard(newBoard))
        dispatch(toggleAddBoard())
    }

    const dispatch = useAppDispatch()
    const exitAddBoardWindow = () => {
        dispatch(toggleAddBoard())
    }
    return (
        <div
            className="fixed top-0 left-0 grid w-full h-full place-content-center bg-black/50"
            onClick={exitAddBoardWindow}
        >
            <form
                className="bg-white dark:bg-very-dark-grey w-[calc(100vw-40px)] tablet:w-[480px] rounded-md p-[32px] flex flex-col space-y-[24px]"
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <h2 className="text-black dark:text-white">Add New Board</h2>
                <TextField
                    placeholder="e.g. Web Design"
                    {...register('boardName', {
                        required: 'Field cannot be empty',
                    })}
                    error={errors?.boardName}
                />
                <div className="flex space-y-[12px] flex-col max-h-[25vh] tablet:max-h-[30vh] overflow-y-scroll">
                    {fields.map((field, index) => (
                        <ArrayTextField
                            {...register(`columns.${index}.name` as const, {
                                required: 'Field cannot be empty',
                            })}
                            error={errors?.columns?.[index]?.name}
                            key={index}
                            index={index}
                            remove={remove}
                        />
                    ))}
                </div>
                <div
                    onClick={() =>
                        append({
                            name: '',
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
                    Create New Board
                </RoundedButton>
            </form>
        </div>
    )
}

export default AddBoardWindow
