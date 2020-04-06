import tasksActionTypes from './tasks.types';
import { createClient } from 'react-fetching-library';

export const fetchTasksStart = () => ({
  type: tasksActionTypes.FETCH_TASKS_START
});

export const createTask = data => ({
  type: tasksActionTypes.CREATE_TASK,
  payload: data
});

export const deleteTask = taskId => ({
  type: tasksActionTypes.DELETE_TASK,
  payload: taskId
});

export const updateTask = data => ({
  type: tasksActionTypes.UPDATE_TASK,
  payload: data
});

export const fetchTasksSuccess = tasks => ({
  type: tasksActionTypes.FETCH_TASKS_SUCCESS,
  payload: tasks
});

export const fetchTasksFailure = err => ({
  type: tasksActionTypes.FETCH_TASKS_FAILURE,
  payload: err
});

export const clearTasks = () => ({
  type: tasksActionTypes.CLEAR_TASKS,
});

export const fetchTasksStartAsync = () => {
  return dispatch => {
    dispatch(fetchTasksStart());

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTgzZjY0NzM2Njg1YzAwMTczMjgwZmQiLCJpYXQiOjE1ODU3NDUyNzB9.ZY4WwX87xnokeTQipzAR0Mt9pj7dgX5z_V2e9hR0kS8");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'manual'
    };

    return fetch("https://cors-anywhere.herokuapp.com/https://aqueous-beach-21150.herokuapp.com/tasks/", requestOptions)
      .then(response => response.text())
      .then(result => dispatch(fetchTasksSuccess(JSON.parse(result))))
      .catch(error => dispatch(fetchTasksFailure(error)));
  };
};
