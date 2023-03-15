import ArrayTextField from '@/components/atoms/ArrayTextField'
import DropDownMenu from '@/components/atoms/DropDownMenu'
import RoundedButton from '@/components/atoms/RoundedButton'
import TextAreaField from '@/components/atoms/TextAreaField'
import TextField from '@/components/atoms/TextField'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
    addNewTask,
    currentStatusArraySelector,
    editedTaskSelector,
    updateSelectedTask,
} from '@/store/DataSlice'
import {
    toggleAddTask,
    toggleEditTask,
    toggleViewTask,
} from '@/store/EditModesSlice'
import { EditTaskInputType } from '@/types/EditTaskTypes'
import { Task } from '@/types/DataTypes'
import { DevTool } from '@hookform/devtools'
import React, { useEffect } from 'react'
import {
    Controller,
    SubmitHandler,
    useFieldArray,
    useForm,
} from 'react-hook-form'
import { NewTaskInputTypes } from '@/types/NewTaskInputTypes'

const AddTaskWindow: React.FC = () => {
    const dispatch = useAppDispatch()
    const exitTaskModeFunction = () => {
        dispatch(toggleAddTask())
    }
    const { statusArray, defaultArrayIndex } = useAppSelector(
        currentStatusArraySelector
    )
    const { task } = useAppSelector(editedTaskSelector)
    const {
        register,
        handleSubmit,
        control,

        formState: { errors },
    } = useForm<NewTaskInputTypes>({
        defaultValues: {
            description: '',
            status: statusArray[0],
            subtasks: [
                {
                    title: '',
                    isCompleted: false,
                },
                {
                    title: '',
                    isCompleted: false,
                },
            ],
            title: '',
        },
    })
    const { fields, append, remove } = useFieldArray({
        name: 'subtasks',
        control,
    })
    const onSubmit: SubmitHandler<NewTaskInputTypes> = (data) => {
        const newTask: Task = {
            title: data.title,
            description: data.description,
            subtasks: data.subtasks,
            status: data.status.label,
        }
        const newTaskColumnIndex = data.status.value
        dispatch(
            addNewTask({
                newTask,
                newTaskColumnIndex,
            })
        )

        dispatch(toggleAddTask())
    }
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'scroll'
        }
    })

    return (
        <div
            className="fixed top-0 left-0 grid w-full h-full bg-black/50 place-content-center z-[100]"
            onClick={exitTaskModeFunction}
        >
            <form
                className="bg-white rounded-lg dark:bg-dark-grey w-[calc(100vw-40px)] tablet:w-[480px] p-[32px] flex flex-col space-y-[24px]"
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className="text-black dark:text-white">Add New Task</h2>
                <div>
                    <p className="medium-text text-medium-gray mb-[8px]">
                        Title
                    </p>
                    <TextField
                        error={errors.title}
                        placeholder="e.g. Take coffee break"
                        {...register('title', {
                            required: 'Field cannot be empty',
                        })}
                    ></TextField>
                </div>
                <div className="overflow-hidden">
                    <p className="medium-text text-medium-gray mb-[8px]">
                        Description
                    </p>
                    <TextAreaField
                        {...register('description')}
                        placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                    />
                </div>
                <div className="flex flex-col space-y-[12px] max-h-[25vh] overflow-y-scroll">
                    <p className="medium-text text-medium-gray mb-[8px]">
                        Subtasks
                    </p>
                    {fields.map((field, index) => (
                        <ArrayTextField
                            key={field.id}
                            {...register(`subtasks.${index}.title` as const, {
                                required: 'Field cannot be empty',
                            })}
                            error={errors.subtasks?.[index]?.title}
                            placeholder="e.g. Make coffee"
                            remove={remove}
                            index={index}
                        />
                    ))}
                </div>
                <div
                    onClick={() =>
                        append({
                            title: '',
                            isCompleted: false,
                        })
                    }
                >
                    <RoundedButton
                        variant="secondary"
                        full
                    >
                        + Add New Subtask
                    </RoundedButton>
                </div>
                <div>
                    <Controller
                        control={control}
                        name="status"
                        render={({ field: { onChange, value, ref } }) => (
                            <DropDownMenu
                                ref={ref}
                                array={statusArray}
                                defaultValue={statusArray[0]}
                                onChange={onChange}
                            />
                        )}
                    />
                </div>
                <div>
                    <RoundedButton
                        submit
                        variant="primary"
                        full
                    >
                        Save Changes
                    </RoundedButton>
                </div>
            </form>
            <DevTool control={control} />
        </div>
    )
}

export default AddTaskWindow
