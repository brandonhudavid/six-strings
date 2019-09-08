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
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import MetricListMenu from './MetricListMenu.js'
import {
	addSong
} from '../actions/actions'

// react-redux
import { connect } from 'react-redux'

// lodash uniqueId
import { uniqueId } from 'lodash'

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
  const [ inputErr, setInputErr ] = React.useState(false)
  const [ onPopup, setOnPopup ] = React.useState(true)
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
    setOnPopup(true)
    onClose()
  }

  function songNameErr() {
    if (!onPopup) return songName ? null : true
  }

  function artistErr() {
    if (!onPopup) return artist ? null : true
  }

  function resourcesErr() {
    if (!onPopup) return resources ? null : true
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
    setOnPopup(false)
    if (songName && artist && difficulty && progress && resources) {
      console.log("dispatching:", songName, artist, difficulty, progress, resources)
      props.dispatch(addSong({
        id: uniqueId(),
        name: songName,
        artist: artist,
        difficulty: difficulty,
        progress: progress,
        resources: resources
      }))
      handleClose()
    } else {
      console.log("not dispatching:", songName, artist, difficulty, progress, resources)
      setInputErr(true)
    }
  }

  return (
    <Dialog fullWidth={true} maxWidth={'md'} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Add new song</DialogTitle>
        <List>
          <ListItem>
            <FormControl error={songNameErr()} className={classes.textField}>
              <InputLabel htmlFor="component-error">Song</InputLabel>
              <Input
                id="song-name"
                value={songName}
                onChange={handleTextFieldChange}
              />
              {songNameErr() ? <FormHelperText>Provide a song name.</FormHelperText> : null}
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl error={artistErr()} className={classes.textField}>
              <InputLabel htmlFor="component-error">Artist</InputLabel>
              <Input
                id="artist"
                value={artist}
                onChange={handleTextFieldChange}
              />
              {artistErr() ? <FormHelperText>Provide an artist.</FormHelperText> : null}
            </FormControl>
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
          </div>
          <ListItem>
            <FormControl error={resourcesErr()} className={classes.textField}>
              <InputLabel htmlFor="component-error">Resources</InputLabel>
              <Input multiline
                id="resources"
                value={resources}
                onChange={handleTextFieldChange}
              />
              {resourcesErr() ? <FormHelperText>Provide a resource.</FormHelperText> : null}
            </FormControl>
          </ListItem>
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

