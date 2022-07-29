import React from 'react'
import { Redirect, Route } from 'react-router'
import PropTypes from 'prop-types';

const PrivateRoute = ( props ) => {

    const { isAuth, component: Componente, ...resto } = props

    return (
        <>
            { isAuth && <Route {...resto } component={ Componente }></Route> }
            { isAuth === false && <Redirect to="/auth/login"/> }
        </>
    )
}

export default PrivateRoute

PrivateRoute.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}