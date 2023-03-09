export interface EditBoardInputTypes {
    boardName: string
    columns: {
        name: string
        index: number | string
    }[]
}
