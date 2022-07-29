import { types } from "../../TYPES/types"

const tipos = {
    login: '[Auth] Login',
    logout: '[Auth] Logout',

    uiLoadingOn: '[UI] Loading ON',
    uiLoadingOff: '[UI] Loading OFF',

    uiSetError: '[UI] Set Error',
    uiRemoveError: '[UI] Remove Error',

    notesAdd: '[Notes] New Note',
    notesActive: '[Notes] Set Active',
    notesLoad: '[Notes] Load Notes',
    notesUpdate: '[Notes] Update Note',
    notesFileUrl: '[Notes] Update Image URL',
    notesDelete: '[Notes] Delete Note',
    notesClear: '[Notes] Clear Notes'
}

describe('Pruebas archivo Types', () => {

    test('Debe de tener los types completos', () => {

        expect( types ).toMatchSnapshot()
        expect( types ).toEqual( tipos )
    })

})