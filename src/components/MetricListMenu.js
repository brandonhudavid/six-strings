import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function MetricListMenu(props) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const { onChange } = props

  function handleClickListItem(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuItemClick(index, option) {
    onChange(option)
    setSelectedIndex(index);
    setAnchorEl(null);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div className={classes.root}>
      <List component="nav" aria-label={props.metric}>
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label={props.metric}
          onClick={handleClickListItem}
        >
          <ListItemText primary={props.options[selectedIndex]} secondary={props.metric} />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={event => handleMenuItemClick(index, option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

