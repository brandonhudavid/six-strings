// react
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

// redux
import { createStore } from 'redux'
import songsApp from './reducers/reducers'
import {
	addSong
} from './actions/actions'
import AddSongComponent from './components/AddSongDialog'
import SongsTable from './components/SongsTable'
import { 
  Provider,
  connect
 } from 'react-redux'

const store = createStore(songsApp)
store.dispatch(addSong({
  name: 'Give Love A Try',
  artist: 'Nick Jonas',
  difficulty: 'easy',
  progress: 'finished',
  resources: 'https://www.youtube.com/watch?v=frxXGvMpgdg'
}))
store.dispatch(addSong({
  name: 'Safe and Sound',
  artist: 'Taylor Swift',
  difficulty: 'medium',
  progress: 'finished',
  resources: 'https://www.youtube.com/watch?v=Hhdo_mXqltM'
}))



class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.unsubscribe = store.subscribe(() => console.log(store.getState()))	
	}

	
	render() {
		return (
        <>
          <SongsTable />
          <div style={{display: 'block', textAlign: 'center',  marginTop: 20 + 'px'}}>
            <AddSongComponent />
          </div>
        </>
  	)
	}
}

const rootElement = document.getElementById("root");
console.log('store:', store)
console.log('store state:', store.getState())
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement);

