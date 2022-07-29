import { types } from "../TYPES/types";


export const uiReducer = (estado = {}, accion ) => {

    switch (accion.type) {

        case types.uiLoadingOn:
            console.log('uiLoadingOn: ');
            return { ...estado, cargando: true }
        case types.uiLoadingOff:
            return { ...estado, cargando: false }

        case types.uiSetError:
            return { ...estado, msgError: accion.payload }
        case types.uiRemoveError:
            return { ...estado, msgError: null}
            
        default:
            return estado;
    }
}