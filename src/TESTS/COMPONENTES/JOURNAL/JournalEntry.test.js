import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'
import { mount } from 'enzyme';
import { Provider } from "react-redux";
import { JournalEntry } from '../../../COMPONENTES/JOURNAL/JournalEntry';
import { activeNote } from '../../../ACTIONS/actionNotes';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {}

const nota = {
    id: 123,
    titulo: 'Titulo de prueba',
    texto: 'El texto de prueba de la nota',
    fecha: 0,
    imgUrl: 'https://www.estaurlnoexiste,esdeprueba.com/foto.jpg'
}

let store = mockStore( initState )
store.dispatch = jest.fn()

const wrapper = mount( 
    <Provider store={ store }>
        <JournalEntry { ...nota }/>
    </Provider>
)

describe('Prueba en componente JournalEntry', () => {

    test('Debe de mostrar el componente correctamente', () => {
        expect( wrapper ).toMatchSnapshot()
    })

    test('Debe de activar la nota seleccionada', () => {
        wrapper.find('.journal__entry').prop('onClick')()
        expect( store.dispatch ).toHaveBeenCalledTimes(1)
        expect( store.dispatch ).toHaveBeenCalledWith(
            activeNote( nota.id, { ...nota } )
        )
    })
})