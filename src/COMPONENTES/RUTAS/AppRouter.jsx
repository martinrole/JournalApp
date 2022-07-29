import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { autorizacion } from '../../FIREBASE/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import JournalScreen from '../JOURNAL/JournalScreen'
import { useDispatch } from 'react-redux';
import { actionLogin } from '../../ACTIONS/actionAuth';
import PublicRoute from './PublicRoute';
import { AuthRouter } from './AuthRouter'
import PrivateRoute from './PrivateRoute';
import { loadNotesAction } from '../../ACTIONS/actionNotes';

const AppRouter = () => {

    const dispatch = useDispatch()
    const [isAuth, setIsAuth] = useState(false)
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        onAuthStateChanged( autorizacion, (usuario) => {

            if (usuario) {
                dispatch( actionLogin( usuario.uid, usuario.displayName ) )
                dispatch( loadNotesAction( usuario.uid ) )
                setIsAuth(true)
            } else {
                setIsAuth(false)
            }

            setCargando(false)
        })
    }, [dispatch])

    if ( cargando ) {
        return (
            <h1>Wait momento...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute path="/auth" component={ AuthRouter } isAuth={ isAuth }/>
                    <PrivateRoute exact path="/" component={ JournalScreen } isAuth={ isAuth }/>
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter