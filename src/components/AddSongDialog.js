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
  const classes = useStyles()
  
  function handleClose() {
    onClose()
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
            />
          </ListItem>
          <ListItem>
              <TextField
                id="artist"
                label="Artist"
                className={classes.textField}
                placeholder="Artist"
                margin="normal"
              />
            </ListItem>
          <div style={{display: 'block', textAlign: 'left'}}>
            <div style={{display: 'inline-block'}}>
              <MetricListMenu
                metric="Difficulty"
                options={["Easy", "Medium", "Hard"]}
              />
            </div>
            <div style={{display: 'inline-block'}}>
              <MetricListMenu
                metric="Progress"
                options={["To Do", "In Progress", "Done"]}
              />
            </div>
            <TextField
              id="outlined-textarea"
              label="Resources"
              placeholder="Add resources here..."
              multiline
              className={classes.textField}
              style={{width: '98%'}}
              margin="normal"
              variant="outlined"
            />
            <div style={{display: 'block', textAlign: 'right'}}>
              <div style={{display: 'inline-block'}}>
                <Button variant="contained" color="primary" className={classes.button}>
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

export function AddSongComponent() {
  const [open, setOpen] = React.useState(false)
  
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
      <AddSongDialog open={open} onClose={handleClose} />
    </div>
  )
}

export default AddSongComponent;

