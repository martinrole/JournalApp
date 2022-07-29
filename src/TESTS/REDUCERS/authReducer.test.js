import { authReducer } from "../../REDUCERS/authReducer"
import { types } from "../../TYPES/types"

describe('Pruebas en authReducer', () => {

    test('Debe retornar login', () => {
        const action = {
            type: types.login,
            payload: {
                uid: 'q348hvb123vHGUYg',
                displayName: 'Test de Prueba'
            }
        }

        const state = authReducer({}, action )
        expect( state ).toEqual({
            uid: 'q348hvb123vHGUYg',
            name: 'Test de Prueba'
        })
    })

    test('Debe retornar logout', () => {   
        const action = {
            type: types.logout,
        }

        const state = authReducer({}, action )
        expect( state ).toEqual({})
    })

    test('Debe retornar el estado', () => {
        const initialState = {
            uid: 'q348hvb123vHGUYg',
            displayName: 'Test de Prueba',
            activeNote: {
                id: '4343njoJHG',
                titulo: 'Es el titulo de prueba',
                texto: 'Es el texto de la nota'
            }
        }
        
        const action = {
            type: 'No entra en switch',
        }

        const state = authReducer( initialState , action )
        expect( state ).toEqual( initialState )
    })
})