import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Import the root reducer, which combines all reducers in your application
import rootReducer from './reducers/index.js';

// Created a Redux store using the createStore function
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;