import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'
import { mount } from 'enzyme';
import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router-dom';

import RegisterScreen from '../../../COMPONENTES/AUTH/RegisterScreen';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
    auth: {},
    ui: {
        cargando: false
    }
}

let store = mockStore( initState )

const wrapper = mount( 
    <Provider store={ store }>
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
)

describe('Pruebas en componente RegisterScreen', () => {

    beforeEach(() => {
        //Limpiar el store despuès de cada test
        store = mockStore( initState )
        jest.clearAllMocks()
    })

    test('Debe mostrar el componente correctamente', () => {
        expect( wrapper ).toMatchSnapshot()
    })

    test('Debe mostrar la caja de alerta con error del form', () => {

        const inputCorreo = wrapper.find('input[name="correo"]')
        inputCorreo.simulate('change',{
            target:{
                value:'',
                name:'correo'
            }
        })

        wrapper.find('form').simulate('submit')

        const msgError = wrapper.find('.auth__alert-error')

        expect( msgError.exists() ).toBe(true)
        expect( msgError.text().trim() ).toBe('Correo no es válido')

    })
})