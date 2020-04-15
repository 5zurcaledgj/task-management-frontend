import React from 'react';
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";


import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SettingsIcon from '@material-ui/icons/Settings';
import AddBoxIcon from '@material-ui/icons/AddBox';

import useStyles from './drawer.styles';

import TasksListPage from '../../pages/tasks/tasks-list/tasks-list.component'
import TaskCreationPage from '../../pages/tasks/task-creation-form/task-creation-form.component'

const history = createBrowserHistory();

const MiniDrawer = ({ isDrawerOpen, handleDrawerClose, setMainMessage }) => {
  const classes = useStyles();
  const theme = useTheme();

  const onClickHandler = mainMessage => {
    console.log(mainMessage);
    if (isDrawerOpen) {
      handleDrawerClose();
    }

    setMainMessage(mainMessage)
  }

  return (
    <Router history={history}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: isDrawerOpen,
          [classes.drawerClose]: !isDrawerOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: isDrawerOpen,
            [classes.drawerClose]: !isDrawerOpen,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            key='Tasks'
            component={Link}
            to="/tasks/list"
            onClick={() => onClickHandler("Tasks")}
          >
            <ListItemIcon><AssignmentIcon /></ListItemIcon>
            <ListItemText primary='Tasks' />
          </ListItem>
          <ListItem
            button
            key='Tasks'
            component={Link}
            to="/tasks/create"
            onClick={() => onClickHandler("Create a Task")}
          >
            <ListItemIcon><AddBoxIcon /></ListItemIcon>
            <ListItemText primary='Tasks' />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key='Settings'>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary='Settings' />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route exact path="/tasks/list" component={TasksListPage} />
        <Route exact path="/tasks/create" component={TaskCreationPage} />
      </main>
    </Router>
  );
}

export default MiniDrawer;