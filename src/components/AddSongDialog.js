import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField'

import MetricListMenu from './MetricListMenu.js'
import {
	addSong
} from '../actions/actions'

// react-redux
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function AddSongDialog(props) {
  const { onClose, open } = props
  const [ songName, setSongName ] = React.useState('')
  const [ artist, setArtist ] = React.useState('')
  const [ difficulty, setDifficulty ] = React.useState('')
  const [ progress, setProgress ] = React.useState('')
  const [ resources, setResources ] = React.useState('')
  const classes = useStyles()

  React.useEffect(() => {
    if (difficulty == '') {
      setDifficulty('Medium')
    }
    if (progress == '') {
      setProgress('In Progress')
    }
  })
  
  function handleClose() {
    setSongName('')
    setArtist('')
    setDifficulty('')
    setProgress('')
    setResources('')
    onClose()
  }

  function handleTextFieldChange(e) {
    console.log('handleFieldChange called')
    switch (e.target.id) {
      case 'song-name':
        console.log("setting song-name to:", e.target.value)
        setSongName(e.target.value)
        break
      case 'artist':
        setArtist(e.target.value)
        break
      case 'resources':
        setResources(e.target.value)
        break
      default:
        break
    }
  }

  function handleDifficultyChange(difficulty) {
    console.log('handle difficulty to:', difficulty)
    setDifficulty(difficulty)
  }

  function handleProgressChange(progress) {
    console.log('handle progress:', progress)
    setProgress(progress)
  }


  function addSongClicked() {
    if (songName && artist && difficulty && progress && resources) {
      console.log("dispatching:", songName, artist, difficulty, progress, resources)
      props.dispatch(addSong({
        name: songName,
        artist: artist,
        difficulty: difficulty,
        progress: progress,
        resources: resources
      }))
      handleClose()
    } else {
      console.log("not dispatching:", songName, artist, difficulty, progress, resources)
    }
  }

  return (
    <Dialog fullWidth={true} maxWidth={'md'} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Add new song</DialogTitle>
        <List>
          <ListItem>
            <TextField
              id="song-name"
              label="Song"
              className={classes.textField}
              placeholder="Song"
              margin="normal"
              onChange={handleTextFieldChange}
            />
          </ListItem>
          <ListItem>
              <TextField
                id="artist"
                label="Artist"
                className={classes.textField}
                placeholder="Artist"
                margin="normal"
                onChange={handleTextFieldChange}
              />
            </ListItem>
          <div style={{display: 'block', textAlign: 'left'}}>
            <div style={{display: 'inline-block'}}>
              <MetricListMenu
                id="difficulty"
                metric="Difficulty"
                options={["Easy", "Medium", "Hard"]}
                onChange={handleDifficultyChange}
              />
            </div>
            <div style={{display: 'inline-block'}}>
              <MetricListMenu
                id="progress"
                metric="Progress"
                options={["To Do", "In Progress", "Done"]}
                onChange={handleProgressChange}
              />
            </div>
            <TextField
              id="resources"
              label="Resources"
              placeholder="Add resources here..."
              multiline
              className={classes.textField}
              style={{width: '98%'}}
              margin="normal"
              variant="outlined"
              onChange={handleTextFieldChange}
            />
            <div style={{display: 'block', textAlign: 'right'}}>
              <div style={{display: 'inline-block'}}>
                <Button variant="contained" color="primary" className={classes.button} onClick={()=>addSongClicked()}>
                  Add Song
                </Button>
              </div>
              <div style={{display: 'inline-block'}}>
                <Button variant="contained" className={classes.button} onClick={()=>handleClose()}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </List>
   </Dialog>
  )
}

export function AddSongComponent(props) {
  const [open, setOpen] = React.useState(false)
  //const store = props.store
  console.log('AddsongComponent props:', props)
  
  function handleClickOpen() {
    setOpen(true)
  }

  const handleClose = value => {
    setOpen(false)
  }

  return (
    <div style={{display: 'inline-block'}} >
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add new song
      </Button>
      <AddSongDialog open={open} onClose={handleClose} dispatch={props.dispatch} />
    </div>
  )
}

export default connect()(AddSongComponent)

