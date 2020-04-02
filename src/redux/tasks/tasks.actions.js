import tasksActionTypes from './tasks.types';

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

export const fetchTasksStartAsync = () => {
  return dispatch => {
    dispatch(fetchTasksStart());

    const myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTgzZjY0NzM2Njg1YzAwMTczMjgwZmQiLCJpYXQiOjE1ODU3NDUyNzB9.ZY4WwX87xnokeTQipzAR0Mt9pj7dgX5z_V2e9hR0kS8'
    );

    const requestOptions = {
      method: 'GET',
      mode: 'no-cors',
      headers: myHeaders,
      redirect: 'follow'
    };

    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://aqueous-beach-21150.herokuapp.com/tasks',
          requestOptions
        );
        const data = await response.json();
        console.log(data);
        dispatch(fetchTasksSuccess([]));
      } catch (err) {
        dispatch(fetchTasksFailure(err));
      }
    };

    fetchData();
  };
};
