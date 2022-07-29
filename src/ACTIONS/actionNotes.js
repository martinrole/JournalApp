import { addDoc, collection, deleteDoc, doc, updateDoc } from "@firebase/firestore"
import Swal from "sweetalert2"
import { baseDatos } from "../FIREBASE/firebaseConfig"
import { fileUploadHelper } from "../HELPERS/fileUpload"
import { loadNotes } from "../HELPERS/loadNotes"
import { types } from "../TYPES/types"


export const newNoteAction = () => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth

        const newNote = {
            titulo: '',
            texto: '',
            fecha: new Date().getTime()
        }

        const docRef = await addDoc( collection(baseDatos, `${uid}/journal/notes`), newNote )
        //console.log('docRef: ', docRef);
        
        dispatch( activeNote(docRef.id, newNote) )
        dispatch( addNewNote(docRef.id, newNote) )
    }
}

export const loadNotesAction = ( uid ) => {
    return async ( dispatch ) => {
        const notes = await loadNotes( uid )
        dispatch( setNotes( notes ) )
    }
}

export const saveNoteAction = ( note ) => async ( dispatch, getState ) => {
        
    const { uid } = getState().auth

    //En los 3 puntos queda el resto de propiedades de la nota, y así se puede extraer el id para no repetirlo
    const {id, imgUrl = null, ...notaFinal } = note

    //Asi se envia a Firebase en la versiòn beta 9
    const noteRef = doc(baseDatos, `${uid}/journal/notes/${note.id}`)
    await updateDoc( noteRef, { imgUrl, ...notaFinal })

    dispatch( refreshNote( note.id, note ))
    Swal.fire('Saved', note.titulo, 'success' )
}

export const deleteNoteAction = ( id ) => async ( dispatch, getState ) => {

    const { uid } = getState().auth

    const  noteRef = doc(baseDatos, `${uid}/journal/notes/${id}`)
    await deleteDoc(noteRef)

    dispatch( deleteNote( id ) )
}

export const fileUpload = ( archivo ) => async ( dispatch, getState ) => {
    
    const activeNote = getState().notes.activeNote

    Swal.fire({
        title: 'Uploading...',
        text: 'Please wait...',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading()
        }
    })

    
    const fileUrl = await fileUploadHelper( archivo )
    activeNote.imgUrl = fileUrl
    
    dispatch( saveNoteAction( activeNote ) )
    Swal.close()

}

export const addNewNote = ( id, nota ) => ({
    type: types.notesAdd,
    payload: { id, ...nota }
})

export const refreshNote = ( id, nota ) => ({
    type: types.notesUpdate,
    payload: { id, nota: { id, ...nota } }
})


export const activeNote = (id, nota) => ({
    type: types.notesActive,
    payload: { id, ...nota }
})

export const setNotes = ( nota ) => ({
    type: types.notesLoad,
    payload: nota
})

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
})

export const clearNotes = () => ({
    type: types.notesClear
})
