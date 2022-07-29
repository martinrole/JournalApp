import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'
import { Sidebar } from '../../../COMPONENTES/JOURNAL/Sidebar';
import { mount } from 'enzyme';
import { Provider } from "react-redux";
import { actionLogOutAsync } from '../../../ACTIONS/actionAuth';
import { newNoteAction } from '../../../ACTIONS/actionNotes';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
    auth: {},
    ui: {
        cargando: false
    },
    notes: {
        notes: [],
        activeNote: null
    }
}

let store = mockStore( initState )
store.dispatch = jest.fn()



//Simula la ejecución de la función
jest.mock('../../../ACTIONS/actionAuth', () => ({
    actionLogOutAsync: jest.fn(),
}))

jest.mock('../../../ACTIONS/actionNotes', () => ({
    newNoteAction: jest.fn(),
}))

const wrapper = mount( 
    <Provider store={ store }>
        <Sidebar />
    </Provider>
)

describe('Pruebas en componente Sidebar', () => {

    test('Debe mostrar el componente correctamente', () => {
        expect( wrapper ).toMatchSnapshot()
    })

    test('Debe llamar la acción del logout', () => {
        wrapper.find('button').simulate('click')  
        expect( actionLogOutAsync ).toHaveBeenCalledTimes(1)
    })

    test('Debe llamar la acción newNote', () => {
        wrapper.find('.journal__new-entry').simulate('click')
        expect( newNoteAction ).toHaveBeenCalledTimes(1)
    })
})