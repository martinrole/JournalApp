import { types } from "../TYPES/types";

export const authReducer = (estado = {}, accion ) => {

    switch (accion.type) {
        case types.login:
            return {
                uid: accion.payload.uid,
                name: accion.payload.displayName
            }
            
        case types.logout:
            return {}
    
        default:
            return estado;
    }

}