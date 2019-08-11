//import React from 'react';
//import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
//import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux'
import songsApp from './reducers/reducers'
import {
	addSong
} from './actions/actions'

const store = createStore(songsApp)

console.log(store.getState())

const unsubscribe = store.subscribe(() => console.log(store.getState()))

// dispatch tests
store.dispatch(addSong({
	song: 'Give Love A Try',
	artist: 'Nick Jonas',
	difficulty: 'easy',
	progress: 'finished',
	resources: 'https://www.youtube.com/watch?v=frxXGvMpgdg'
}))
store.dispatch(addSong({
	song: 'Safe and Sound',
	artist: 'Taylor Swift',
	difficulty: 'medium',
	progress: 'finished',
	resources: 'https://www.youtube.com/watch?v=Hhdo_mXqltM'
}))

unsubscribe()

//ReactDOM.render(<App />, document.getElementById('root'));
