import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk' 
import { authReducer } from '../REDUCERS/authReducer';
import { notesReducer } from '../REDUCERS/notesReducer';
import { uiReducer } from '../REDUCERS/uiReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;           //Esto siempre es igual y es para utilizar la extensiòn de Google Chrome de Redux

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
})

export const store = createStore(
    reducers,
    composeEnhancers( applyMiddleware( thunk ) )
)