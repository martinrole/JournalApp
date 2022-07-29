//Video de explicación de este archivo 291
import LoginScreen from "../../../COMPONENTES/AUTH/LoginScreen"
import { mount } from 'enzyme';
import { Provider } from "react-redux";

import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'
import { actionGoogleLogin, actionLoginAsync } from "../../../ACTIONS/actionAuth";

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
    auth: {},
    ui: {
        cargando: false
    }
}

let store = mockStore( initState )
store.dispatch = jest.fn()

//Simula la ejecución de la función
jest.mock('../../../ACTIONS/actionAuth', () => ({
    actionGoogleLogin: jest.fn(),
    actionLoginAsync: jest.fn()
}))

const wrapper = mount( 
    <Provider store={ store }>
        <MemoryRouter>
            <LoginScreen/>
        </MemoryRouter>
    </Provider>
)

describe('Pruebas en componente LoginScreen', () => {

    beforeEach(() => {
        //Limpiar el store despuès de cada test
        store = mockStore( initState )
        jest.clearAllMocks()
    })

    test('Debe mostrar el componente correctamente', () => {
        expect( wrapper ).toMatchSnapshot()
    })

    test('Debe activar la acción de actionGoogleLogin', () => {

        wrapper.find('.google-btn').simulate('click')
        expect( actionGoogleLogin ).toHaveBeenCalledTimes(1)
    })

    test('Debe activar la acción de actionLoginAsync', () => {

        wrapper.find('form').simulate('submit')
        expect( actionLoginAsync ).toHaveBeenCalledTimes(1)
        expect( actionLoginAsync ).toHaveBeenCalledWith( 'pruebaMartin@hotmail.com','12nj3nh4')
    })

})