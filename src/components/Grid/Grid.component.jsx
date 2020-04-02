import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import MediaCard from '../Card/Card.component';
import withSpinner from '../with-spinner/with-spinner.component';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginTop: '20px'
  },
  paper: {
    height: 140,
    width: 100
  }
}));

const SpacingGrid = ({ isLoading }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={10}>
          {[0, 1, 2].map(value => (
            <Grid key={value} item>
              <MediaCard />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading
  };
};

const SpacingGridWithSpinner = compose(
  connect(mapStateToProps),
  withSpinner
)(SpacingGrid);

export default SpacingGridWithSpinner;
