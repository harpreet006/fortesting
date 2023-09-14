
import rootReducer from './reducers/index.js';
import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const  persistor = persistStore(store)

export default store;


// usable lalit


// import rootReducer from './reducers/index.js';
// import { createStore, applyMiddleware,compose } from 'redux';
// import thunk from 'redux-thunk';
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );

// export default store;



// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import reducers from './reducers';
// import { save, load } from "redux-localstorage-simple";

// import { composeWithDevTools } from "redux-devtools-extension";
// const config = {
//   key: 'root',
//   storage,

// };
// const reducer = persistReducer(config, reducers);


// export const store = createStore(
//   reducer,
//   load(),
//   composeWithDevTools(applyMiddleware(thunk, save()))
// );

