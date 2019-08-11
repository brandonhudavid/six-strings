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


// material ui
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

class App extends React.Component {

  classes() {
    return useStyles()
  }
	
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
        <Paper className={this.classes().root}>
          <Table className={this.classes().table}>
            <TableHead>
              <TableRow>
                <TableCell>Song</TableCell>
                <TableCell align="right">Artist</TableCell>
                <TableCell align="right">Difficulty</TableCell>
                <TableCell align="right">Progress</TableCell>
                <TableCell align="right">Resources</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.store.getState().songs.map(song => (
                <TableRow key={song.name}>
                  <TableCell component="th" scope="row">
                    {song.name}
                  </TableCell>
                  <TableCell align="right">{song.artist}</TableCell>
                  <TableCell align="right">{song.difficulty}</TableCell>
                  <TableCell align="right">{song.progress}</TableCell>
                  <TableCell align="right">
                    <a href={song.resources} rel="noopener noreferrer" target="_blank">{song.resources}</a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <div style={{display: 'block', textAlign: 'center',  marginTop: 20 + 'px'}}>
          <AddSongComponent />
        </div>
	    </div>
  	)
	}
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
