import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
// import logger
import logger from 'redux-logger';
// import Saga
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import './index.css';

// create the root Saga
function* rootSaga() {
    // takeEvery SHOUTs go in here
    yield takeEvery('NEW_SEARCH', searchGifs);
    yield takeEvery('FAV_GIF', setFavGifs);

}


// ADD FUNCTIONS THAT DO AXIOS HERE
function* searchGifs(action) {
    console.log('bout to search some gifs');
    
    try {
        // create a const to hold the value of server's response
        const apiResData = yield axios.post('/api/search', {data: action.payload});
        console.log('POST /api/search response is', apiResData.data);
        
        // dispatch (aka put)
        yield put({
            type: 'SET_SEARCH_RESULTS',
            payload: apiResData.data
        });
    }
    catch (err) {
        console.log('searchGifs failed', err);
        alert(`We can't seem to do the search for you...`);
    }
}

function* setFavGifs(action) {
    console.log('action', action.payload)
    yield axios.post('/api/favorite', action.payload)

    // yield put({
    //     type: 'SET_FAV_GIFS',
    //     payload: action.payload
    // })
}

// ADD OUR REDUCERS HERE
//
const searchReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SET_SEARCH_RESULTS':
            return action.payload;
        default:
            return state;
    }
}
const favGifsReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_FAV_GIFS':
            return [...state, action.payload.embed_url];
        default:
            return state;
    }
}

// create the sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// create our store
const storeInstance = createStore(
    combineReducers({
        searchReducer,
        favGifsReducer
    }),

    // add logger and sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
