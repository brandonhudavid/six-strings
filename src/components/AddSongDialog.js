import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField'

function AddSongDialog(props) {
  const { onClose, open } = props
  
  function handleClose() {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Add new song</DialogTitle>
        <List>
          <ListItem>
            <TextField
              id="song-name"
              label="Song name"
              placeholder="Song name"
              margin="normal"
            />
          </ListItem>
          <ListItem>
              <TextField
                id="artist"
                label="Artist"
                placeholder="Artist"
                margin="normal"
              />
            </ListItem>
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

