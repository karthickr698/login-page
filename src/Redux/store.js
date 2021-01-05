import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './Reducers';
import thunkMiddleware from 'redux-thunk';

export default function configureStore(initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunkMiddleware))
    );
    return store;
}