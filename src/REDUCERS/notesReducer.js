import { types } from "../TYPES/types";

const estadoInicial = {
    notes: [],
    activeNote: null
}


export const notesReducer = (state = estadoInicial, action) => {

    switch (action.type) {
        case types.notesAdd:
            return {
                ...state,
                notes: [ ...state.notes, action.payload ]
            }
        case types.notesActive:
            return { 
                ...state, 
                activeNote: { ...action.payload } 
            }
        case types.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]
            }
        case types.notesUpdate:
            return {
                ...state,
                notes: state.notes.map( note => note.id === action.payload.id ? action.payload.nota : note )
            }
        case types.notesDelete:
            return {
                ...state,
                activeNote: null,
                notes: state.notes.filter( note => note.id !== action.payload )
            }
        case types.notesClear:
            return {
                ...state,
                activeNote: null,
                notes: []
            }
    
        default:
            return state;
    }

}