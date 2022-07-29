import { types } from "../TYPES/types"

export const actionSetError = ( error ) => ({
    type: types.uiSetError,
    payload: error
})

export const actionRemoveError = () => ({
    type: types.uiRemoveError
})


export const actionLoading = (type) => ({
    type: type
})

