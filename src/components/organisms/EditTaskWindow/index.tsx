import ArrayTextField from '@/components/atoms/ArrayTextField'
import DropDownMenu from '@/components/atoms/DropDownMenu'
import RoundedButton from '@/components/atoms/RoundedButton'
import TextAreaField from '@/components/atoms/TextAreaField'
import TextField from '@/components/atoms/TextField'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
    currentStatusArraySelector,
    editedTaskSelector,
    updateSelectedTask,
} from '@/store/DataSlice'
import { toggleEditTask, toggleViewTask } from '@/store/EditModesSlice'
import { EditTaskInputType } from '@/types/AddNewTaskTypes'
import { Task } from '@/types/DataTypes'
import { DevTool } from '@hookform/devtools'
import React from 'react'
import {
    Controller,
    SubmitHandler,
    useFieldArray,
    useForm,
} from 'react-hook-form'

const EditTaskWindow: React.FC = () => {
    const dispatch = useAppDispatch()
    const exitTaskModeFunction = () => {
        dispatch(toggleEditTask())
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
    } = useForm<EditTaskInputType>({
        defaultValues: {
            description: task.description,
            status: task.status,
            subtasks: task.subtasks,
            title: task.title,
            newStatus: statusArray[defaultArrayIndex],
        },
    })
    const { fields, append, remove } = useFieldArray({
        name: 'subtasks',
        control,
    })
    const onSubmit: SubmitHandler<EditTaskInputType> = (data) => {
        const updatedTask: Task = {
            title: data.title,
            description: data.description,
            subtasks: data.subtasks,
            status: data.newStatus.label,
        }
        const updatedColumnIndex = data.newStatus.value
        dispatch(
            updateSelectedTask({
                task: updatedTask,
                updatedColumnIndex: updatedColumnIndex,
            })
        )
        dispatch(toggleEditTask())
        dispatch(toggleViewTask())
    }
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
                <div>
                    <p className="medium-text text-medium-gray mb-[8px]">
                        Title
                    </p>
                    <TextField
                        error={errors.title}
                        placeholder=""
                        {...register('title', {
                            required: 'Field cannot be empty',
                        })}
                    ></TextField>
                </div>
                <div className="overflow-hidden">
                    <p className="medium-text text-medium-gray mb-[8px]">
                        Description
                    </p>
                    <TextAreaField {...register('description')} />
                </div>
                <div className="flex flex-col space-y-[12px]">
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
                        name="newStatus"
                        render={({ field: { onChange, value, ref } }) => (
                            <DropDownMenu
                                ref={ref}
                                array={statusArray}
                                defaultValue={value}
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

export default EditTaskWindow
