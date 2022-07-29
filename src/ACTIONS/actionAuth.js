import { autorizacion, googleAuth } from "../FIREBASE/firebaseConfig";
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { types } from "../TYPES/types"
import { actionLoading, actionSetError } from "./actionUi";
import Swal from 'sweetalert2'
import { clearNotes } from "./actionNotes";

//Middleware:
export const actionLoginAsync = ( correo, contrasena ) => {
    //Esta función va a retornar un Callback:
    //el dispatch lo va  a entregar el thunk instalado
    return (dispatch) => {

        dispatch( actionLoading(types.uiLoadingOn) )

        return signInWithEmailAndPassword( autorizacion, correo, contrasena )
            .then( ({user}) => {
                dispatch( actionLogin( user.uid, user.displayName ) )
                dispatch( actionLoading(types.uiLoadingOff) )
            })
            .catch ( error => {
                dispatch( actionSetError(error.code) )
                Swal.fire('Error', error.code, 'error')
                dispatch( actionLoading(types.uiLoadingOff) )
            }) 
            
        }
}



export const actionRegisterAsync = ( nombre, correo, contrasena ) => {
    return ( dispatch ) => {

        return createUserWithEmailAndPassword( autorizacion, correo, contrasena )
            .then( async ( { user } ) => {
                await updateProfile( user, { displayName: nombre } )
                
                dispatch(
                    actionLogin( user.uid, user.displayName)
                )
            })
            .catch ( error => {
                dispatch( actionSetError(error.code) )
                Swal.fire('Error', error.code, 'error')
            })  
    }
}

export const actionGoogleLogin = () => {
    return ( dispatch ) => {
        signInWithPopup( autorizacion, googleAuth )
            .then( ( { user } ) => {
                dispatch(
                    actionLogin( user.uid, user.displayName)
                )

            })     
    }
}

export const actionLogOutAsync = () => {
    return async ( dispatch ) => {
        await signOut(autorizacion)

        dispatch( actionLogOut() )
        dispatch( clearNotes() )
    }
}

//Una forma de hacerlo:
// export const actionAuth = (uid, displayName) => {
//     return {
//         type: types.login,
//         payload: {
//             uid,
//             displayName
//         }
//     }
// }


//Segunda forma de hacerlo:
export const actionLogin = (uid, displayName) => ({  
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const actionLogOut = () => ({
    type: types.logout
})