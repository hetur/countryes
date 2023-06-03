import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducer';
import thunk from 'redux-thunk';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

/* esta funcion crea un store de Redux que almcen el estado de la plicacion*/