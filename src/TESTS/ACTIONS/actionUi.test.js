import { actionLoading, actionRemoveError, actionSetError } from "../../ACTIONS/actionUi"
import { types } from "../../TYPES/types"

describe('Pruebas en actionUi', () => {

    test('Todas las acciones deben de funcionar', () => {
        
        const actionError = actionSetError('Hubo un error!!')
        const actionRemove = actionRemoveError()
        const actionLoad = actionLoading( types.actionLoading )


        expect( actionError ).toEqual({
            type: types.uiSetError,
            payload: 'Hubo un error!!'
        })

        expect( actionRemove ).toEqual({ type: types.uiRemoveError})

        expect( actionLoad ).toEqual( { type: types.actionLoading } )

    })
})