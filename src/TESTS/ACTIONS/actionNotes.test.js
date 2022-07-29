/**
 * @jest-environment node
 */
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import { fileUpload, loadNotesAction, newNoteAction, saveNoteAction } from '../../ACTIONS/actionNotes';
import { doc, deleteDoc,getDoc } from "firebase/firestore"; 
import { baseDatos } from '../../FIREBASE/firebaseConfig';
import { types } from '../../TYPES/types';
import '@testing-library/jest-dom'


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
    auth: {
        uid: 'UI_TEST_USER',
        name: 'PRUEBA TEST'
    },
    notes: {
        //El id tiene que ser de una nota existente en FireStore de Testing
        activeNote: {
            id: 'AW9a5lZD6dWnMXQAFrHU',
            titulo: 'Nota activa',
            texto: 'Texto de la nota activa'
        }
    }
}

let store = mockStore( initState )


//Esto sirve para simular una función, y decirle que debe retornar. Explicación video 287 min 7:50 
jest.mock('../../helpers/fileUpload', () => ({
    fileUploadHelper: () => {
        return Promise.resolve('https://Url_Ficticia_Recibida_Que_Se_Guardará_En_Firestore_De_la_Nota.jpg')
    }
}));

//INICIO DE PRUEBAS EN ACTION
describe('Pruebas en actionNotes', () => {

    beforeEach(() => {
        //Limpiar el store despuès de cada test
        store = mockStore( initState )
    })

    test('Debe crear una nota: newNoteAction', async () => {
   
        await store.dispatch( newNoteAction() )
        
        const actions = store.getActions()
        const idNota = actions[0].payload.id
        
        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                titulo: '',
                texto: '',
                fecha: expect.any(Number)
            }
        })

        expect( actions[1] ).toEqual({
            type: types.notesAdd,
            payload: {
                id: expect.any(String),
                titulo: '',
                texto: '',
                fecha: expect.any(Number)
            }
        })

        const notaRef = doc(baseDatos, `UI_TEST_USER/journal/notes/${idNota}`)
        await deleteDoc( notaRef )
    })

    test('Debe cargar las notas loadNotesAction', async () => {

        const { auth } = store.getState()
        await store.dispatch( loadNotesAction( auth.uid ) )

        const actions = store.getActions()
        //console.log('actions: ', actions[0].payload);

        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        })

        const nota = {
            id: expect.any(String),
            titulo: expect.any(String),
            texto: expect.any(String),
            fecha: expect.any(Number)
        }

        expect( actions[0].payload[0] ).toMatchObject( nota)
    })

    test('Debe actualizar la nota saveNoteAction', async () => {

        //Saco un id existente de Firestore para que funcione
        const nota = {
            id: '0qpe7MwthpPVsbfPsO3Z',
            titulo: 'Titulo cambio por el de test',
            texto: 'Texto enviado desde actionNote.test.js'
        }

        await store.dispatch( saveNoteAction(nota) )

        const actions = store.getActions()
        expect( actions[0].type ).toBe( types.notesUpdate )
        expect( actions[0].payload.nota ).toEqual(nota)
    })

    test('Debe actualizar la URL del fileUpload', async () => {

        const archivo = []
        await store.dispatch( fileUpload(archivo) )


        const { notes } = store.getState()
        const docRef = doc( baseDatos, `UI_TEST_USER/journal/notes/${notes.activeNote.id}` )
        const docSnap = await getDoc( docRef )
        const datos = docSnap.data()

        expect( datos.imgUrl ).toBe('https://Url_Ficticia_Recibida_Que_Se_Guardará_En_Firestore_De_la_Nota.jpg')

    })
})