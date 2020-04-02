import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import PrimarySearchAppBar from './components/PrimarySearchAppBar/PrimarySearchAppBar.component';
import SpacingGridWithSpinner from '../src/components/Grid/Grid.component';

import { fetchTasksStartAsync } from '../src/redux/tasks/tasks.actions';

const App = ({ fetchData }) => {
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <PrimarySearchAppBar />
      <SpacingGridWithSpinner />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchTasksStartAsync())
});

export default connect(null, mapDispatchToProps)(App);
