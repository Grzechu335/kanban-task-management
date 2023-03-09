import { Subtask } from './DataTypes'
export interface NewTaskInputTypes {
    title: string
    description: string
    subtasks: Subtask[]
    status: {
        value: number
        label: string
    }
}
