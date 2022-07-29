import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import '@testing-library/jest-dom'
import AppRouter from '../../../COMPONENTES/RUTAS/AppRouter';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { actionLogin } from '../../../ACTIONS/actionAuth';
import { act } from 'react-dom/test-utils';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { autorizacion } from '../../../FIREBASE/firebaseConfig';


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
    actionLogin: jest.fn()
}))


describe('Pruebas componente AppRouter', () => {

    test('Debe llamar el login si estoy autenticado', async () => {

        await act( async () => { 
 
            //1 - Monto primero el componente
            const wrapper = mount(
                <Provider store={ store }>
                    <MemoryRouter>
                        <AppRouter/>
                    </MemoryRouter>
                </Provider>
            )

            // 2 - Hago el llamado de la autenticación para que active es useEffect: El usuario debe existir en la base de datos de pruebas:
            const userCredencials = await signInWithEmailAndPassword(autorizacion, 'prueba_test@hotmail.com', 'pruebas123456' )
            const user = userCredencials.user

            expect( actionLogin ).toHaveBeenCalledWith( user.uid, null )
        })
    })
})