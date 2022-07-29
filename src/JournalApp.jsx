import React from 'react'
import AppRouter from './COMPONENTES/RUTAS/AppRouter'

import { Provider } from 'react-redux'
import { store } from './STORE/store'

const JournalApp = () => {
    return (
        <Provider store={ store }>
            <AppRouter />
        </Provider>
    )
}

export default JournalApp
