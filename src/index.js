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
import { AddSongComponent } from './components/AddSongDialog'
import { SongsTable } from './components/SongsTable'

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.store = createStore(songsApp)
		console.log(this.store.getState())
		this.unsubscribe = this.store.subscribe(() => console.log(this.store.getState()))	
	}

	dispatchTests() {
		// dispatch tests
		this.store.dispatch(addSong({
			name: 'Give Love A Try',
			artist: 'Nick Jonas',
			difficulty: 'easy',
			progress: 'finished',
			resources: 'https://www.youtube.com/watch?v=frxXGvMpgdg'
		}))
		this.store.dispatch(addSong({
			name: 'Safe and Sound',
			artist: 'Taylor Swift',
			difficulty: 'medium',
			progress: 'finished',
			resources: 'https://www.youtube.com/watch?v=Hhdo_mXqltM'
		}))
	}
	
	render() {
	    this.dispatchTests()
		return (
      <div>
        <SongsTable songs={this.store.getState().songs} />
        <div style={{display: 'block', textAlign: 'center',  marginTop: 20 + 'px'}}>
          <AddSongComponent store={this.store} />
        </div>
	    </div>
  	)
	}
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

