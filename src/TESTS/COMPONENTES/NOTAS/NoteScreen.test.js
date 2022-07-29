import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'
import { mount } from 'enzyme';
import { Provider } from "react-redux";
import { NoteScreen } from '../../../COMPONENTES/NOTAS/NoteScreen';
import { activeNote } from '../../../ACTIONS/actionNotes';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
    auth: {},
    ui: {
        cargando: false
    },
    notes: {
        notes: [],
        activeNote: {
            id: 1234,
            titulo: 'Prueba: titulo de la nota',
            texto: 'Texto de la prueba de la nota',
            fecha: 0
        }
    }
}

let store = mockStore( initState )
store.dispatch = jest.fn()


//Simula la ejecución de la función
jest.mock('../../../ACTIONS/actionNotes', () => ({
    activeNote: jest.fn(),
}))

const wrapper = mount( 
    <Provider store={ store }>
        <NoteScreen />
    </Provider>
)

describe('Pruebas en componente NoteScreen', () => {

    test('Debe mostrar el componente correctamente', () => {
        expect( wrapper ).toMatchSnapshot()
    })

    test('Debe de activar el estado activeNote', () => {
        
        wrapper.find('textarea[name="texto"]').simulate('change', {
            target: {
                name: 'texto',
                value: 'Debe cambiar el texto por este'
            }
        })

        expect( activeNote ).toHaveBeenCalledTimes(1)
        expect( activeNote ).toHaveBeenCalledWith(
            1234,
            {
                id: 1234,
                titulo: 'Prueba: titulo de la nota',
                texto: 'Debe cambiar el texto por este',
                fecha: 0
            }
        )
    })
})