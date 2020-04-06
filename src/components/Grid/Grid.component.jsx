import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';

import MediaCard from '../Card/Card.component';
import withSpinner from '../with-spinner/with-spinner.component';
import useStyles from './Grid.styles.jsx'


const SpacingGrid = tasks => {
  const classes = useStyles();
  let key = 0;
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={10}>
          {tasks.map(task => (
            <Grid key={key++} item>
              <MediaCard {...task} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

const SpacingGridContainer = ({ tasks }) => {
  const classes = useStyles();
  if (null === tasks) {
    return <div>No Data</div>
  }

  let tasksPerContainer = [];
  let temp = [];
  Object.keys(tasks).forEach(key => {
    temp.push(tasks[key]);
    if (3 === temp.length) {
      tasksPerContainer.push(temp);
      temp = [];
    }
  });

  tasksPerContainer.push(temp);
  console.log(tasksPerContainer);
  let key = 0;
  return <div className={classes.wrapper}>
    {
      tasksPerContainer.map(tasks => <SpacingGrid key={key++} tasks={tasks} />)
    }
  </div >
}

const mapStateToProps = ({ tasks }) => {
  return { ...tasks };
};


const SpacingGridWithSpinner = compose(
  connect(mapStateToProps),
  withSpinner
)(SpacingGridContainer);

export default SpacingGridWithSpinner;
