import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// react-redux
import { connect } from 'react-redux'

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

function mapSongs(songs) {
  if (songs) {
    return (
      <TableBody>
      {songs.map(song => (
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
            </TableRow>
          </TableHead>
          {mapSongs(props.songs)}
        </Table>
      </Paper>
   )
}

const mapStateToProps = state => {
  return {
    songs: state.songs
  }
}

export default connect(mapStateToProps)(SongsTable)

