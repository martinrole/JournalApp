import React from 'react'
import { Link } from 'react-router-dom'
import { actionLoginAsync, actionGoogleLogin } from '../../ACTIONS/actionAuth'
import { useForm } from '../../HOOKS/useForm'
import { useDispatch, useSelector  } from 'react-redux'

const LoginScreen = () => {

    const dispatch = useDispatch()
    const { cargando } = useSelector(state => state.ui )

    const [ formValues, handleInputChange ] = useForm({
        correo: 'pruebaMartin@hotmail.com',
        contrasena: '12nj3nh4'
    })

    const { correo, contrasena } = formValues

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch( actionLoginAsync( correo,contrasena ) )
    }

    const handleGoogleLogin = () => {
        dispatch( actionGoogleLogin() )
    }    

    return (
        <>
            <h3 className="auth__title">LoginScreen</h3>
            
            <form onSubmit={ handleSubmit }>
                <input 
                    type="text" 
                    placeholder="Email" 
                    name="correo" 
                    className="auth__input" 
                    autoComplete="off"
                    value = { correo }
                    onChange={ handleInputChange }
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    name="contrasena" 
                    className="auth__input"
                    value= { contrasena }
                    onChange= { handleInputChange }
                />

                <button type="submit" className="btn btn-primario btn-bloque mt-1" disabled={ cargando }>{ cargando ? "Cargando" : "Login"}</button>
            </form>
           
            <div className="auth__social-networks">   
                <div className="google-btn" onClick={ handleGoogleLogin }>
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                    </div>
                    <p className="btn-text">
                        <b>Sign in with google</b>
                    </p>
                </div>
            </div>

            <Link to="/auth/register" className="auth__new-count"> Create new count</Link>

        </>
    )
}

export default LoginScreen
