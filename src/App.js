import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import PrimaryAppBar from './components/app-bar/app-bar.component';

import HomePage from './pages/homepage/homepage.component';
import TasksListPage from './pages/tasks/tasks-list/tasks-list.component';
import TaskCreationPage from './pages/tasks/task-creation-form/task-creation-form.component';
import SignInPageWithSpinner from './pages/sign-in/sign-in.component'
import SignUpPageWithSpinner from './pages/sign-up/sign-up.component';

const App = ({ userToken }) => {

  return (
    <div>
      <PrimaryAppBar />
      <Switch>
        <Route
          path="/"
          exact
          render={() =>
            userToken ? <HomePage /> : <Redirect to="/signin" />
          }
        ></Route>
        <Route path="/tasks/list" component={TasksListPage}></Route>
        <Route path="/tasks/create" exact component={TaskCreationPage}></Route>
        <Route
          path="/signup"
          exact
          render={() =>
            userToken ? <Redirect to="/" /> : <SignUpPageWithSpinner />
          }></Route>
        <Route
          path="/signin"
          exact
          render={() =>
            userToken ? <Redirect to="/" /> : <SignInPageWithSpinner />
          }
        ></Route>
      </Switch>
    </div >
  );
};


const mapStateToProps = ({ user: { userToken } }) => ({ userToken })

export default connect(mapStateToProps)(App);
