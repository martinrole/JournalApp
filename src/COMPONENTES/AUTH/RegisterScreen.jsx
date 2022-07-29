import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../HOOKS/useForm'
import validator from 'validator'
import { useDispatch } from 'react-redux'
import { actionRegisterAsync } from '../../ACTIONS/actionAuth'

const RegisterScreen = () => {

    const [formError, setFormError] = useState(null)
    const dispatch = useDispatch()

    const [ formValues, handleInputChange ] = useForm({
        nombre: 'Martin',
        correo: 'pruebaMartin@hotmail.com',
        contrasena: '12nj3nh4',
        contrasena2: '12nj3nh4'
    })

    const { nombre, correo, contrasena, contrasena2 } = formValues

    const handleRegister = (e) => {
        e.preventDefault()
        
        if ( isFormValid() ) {
            // console.log("Form válido")
            dispatch( actionRegisterAsync( nombre, correo, contrasena ) )
        }
    }

    const isFormValid = () => {

        if( !nombre.trim() ) {
            setFormError("Ingrese un nombre")
            return false
        } else if ( !validator.isEmail( correo) ) {
            setFormError("Correo no es válido")
            return false
        } else if ( contrasena < 5 ) {
            setFormError("Contraseña debe tener al menos 6 carácteres")
            return false
        } else if ( contrasena !== contrasena2 ) {
            setFormError("Contraseñas ingresadas no concuerdan")
            return false
        }

        setFormError(null)
        return true
    }

    return (
        <>
            <h3 className="auth__title">Register Screen</h3>
            
            <form onSubmit={ handleRegister }>
                
                {
                    formError && <div className="auth__alert-error"> { formError } </div>
                }
                
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    name="nombre" 
                    className="auth__input" 
                    autoComplete="off"
                    value={ nombre }
                    onChange={ handleInputChange }
                />
                <input 
                    type="text" 
                    placeholder="Correo" 
                    name="correo" 
                    className="auth__input" 
                    autoComplete="off"
                    value={ correo }
                    onChange={ handleInputChange }

                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    name="contrasena" 
                    className="auth__input"
                    value={ contrasena }
                    onChange={ handleInputChange }

                />
                <input 
                    type="password" 
                    placeholder="Confirmar contraseña" 
                    name="contrasena2" 
                    className="auth__input"
                    value={ contrasena2 }
                    onChange={ handleInputChange }

                />

                <button type="submit" className="btn btn-primario btn-bloque mt-1">Register</button>
            
            </form>
           
            <Link to="/auth/login" className="auth__new-count"> Already registered?</Link>

        </>
    )
}

export default RegisterScreen