import React from 'react'
import { Redirect, Route } from 'react-router'
import PropTypes from 'prop-types';

const PublicRoute = ( props ) => {

    const { isAuth, component: Componente, ...resto } = props

    return (
        <>
            { isAuth && <Redirect to="/"/> }
            { isAuth === false && <Route { ...resto } component={ Componente }></Route> }
        </>
    )
}

export default PublicRoute

PublicRoute.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
