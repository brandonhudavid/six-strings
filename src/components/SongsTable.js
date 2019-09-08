import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';

// react-redux
import { connect } from 'react-redux'

import {
  removeSong
} from '../actions/actions'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: 24,
  },
}));

function mapSongs(props, classes) {
  console.log('mapSongs called')
  if (props.songs) {
    return (
      <TableBody>
      {props.songs.map(song => (
        <TableRow key={song.name}>
          <TableCell component="th" scope="row">
            {song.name}
          </TableCell>
          <TableCell align="right">{song.artist}</TableCell>
          <TableCell align="right">{song.difficulty}</TableCell>
          <TableCell align="right">{song.progress}</TableCell>
          <TableCell align="right">{song.resources}</TableCell>
          <TableCell align="right">
            <DeleteIcon onClick={() => props.dispatch(removeSong(song.id))}  className={classes.icon} />
         </TableCell>
        </TableRow>
      ))}
      </TableBody>
    )
  } else {
    console.log('in mapSongs, but songs is undefined')
  }
}

export function SongsTable(props) {

  const classes = useStyles()
  console.log('Songstable props:', props)
  return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Song</TableCell>
              <TableCell align="right">Artist</TableCell>
              <TableCell align="right">Difficulty</TableCell>
              <TableCell align="right">Progress</TableCell>
              <TableCell align="right">Resources</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          {mapSongs(props, classes)}
        </Table>
      </Paper>
   )
}

const mapStateToProps = state => {
  console.log('mapStateToProps called')
  console.log('state.songs:', state.songs)
  return {
    songs: state.songs
  }
}

export default connect(mapStateToProps)(SongsTable)

