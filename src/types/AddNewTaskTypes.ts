import { Task } from './DataTypes'

export interface EditTaskInputType extends Task {
    newStatus: {
        value: number
        label: string
    }
}
