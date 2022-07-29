import { actionLogin, actionLoginAsync, actionLogOut, actionLogOutAsync, actionRegisterAsync } from "../../ACTIONS/actionAuth"
import { types } from "../../TYPES/types"
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
    auth: {
        uid: 'UI_TEST_USER',
        name: 'PRUEBA TEST'
    }
}

let store = mockStore( initState )


//-------   INICIO DE PRUEBAS   -----------------
describe('Pruebas archivo actionAuth', () => {

    beforeEach(() => {
        //Limpiar el store despuès de cada test
        store = mockStore( initState )
    })

    test('Debe funcionar las acciones Login y Logout', () => {

        const user = {
            uid: 'nSFw2ni5d721nQW22',
            displayName: 'Nombre Pruebas en Auth'
        }
        
        const loginAction = actionLogin(user.uid, user.displayName)
        const logOutAction = actionLogOut()

        expect( loginAction ).toEqual({
            type: types.login,
            payload: user
        })

        expect( logOutAction ).toEqual({
            type: types.logout
        })
    })

    test('Debe realizar el actionLogOutAsync', async () => {

        await store.dispatch( actionLogOutAsync()  )

        const actions = store.getActions()

        expect( actions[0] ).toEqual({
            type: types.logout
        })

        expect( actions[1] ).toEqual({
            type: types.notesClear
        })
    })

    test('Debe realizar el actionLoginAsync', async () => {

        //Tiene que existir el user en Firebase en la sección de Authentication
        const user = {
            correo: 'prueba_test@hotmail.com',
            contrasena: 'pruebas123456'
        }

        await store.dispatch( actionLoginAsync(user.correo, user.contrasena) )

        const actions = store.getActions()
        //console.log('actions: ', actions);

        expect( actions[0] ).toEqual({
            type: types.uiLoadingOn
        })

        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                uid: expect.any(String),
                displayName: null
            }
        })

        expect( actions[2] ).toEqual({
            type: types.uiLoadingOff
        })
    })

    test('Debe realizar el actionRegisterAsync', async () => {

        const newUser = {
            nombre: 'nombre Prueba Register',
            correo: 'register_prueba@hotmail.com',
            contrasena: 'register123456'
        }

        await store.dispatch( actionRegisterAsync(newUser.nombre, newUser.correo, newUser.contrasena) )
        
        const actions = store.getActions()

        //Valida que el usuario ya estè registrado y quiere decir que envió bn la información
        expect( actions[0] ).toEqual({
            type: types.uiSetError,
            payload: 'auth/email-already-in-use'
        })

    })

})