import tasksActionTypes from './tasks.types';

const INITIAL_STATE = {
  tasks: null,
  isFetching: false,
  errorMessage: undefined
};

const taskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case tasksActionTypes.CREATE_TASK:
    case tasksActionTypes.DELETE_TASK:
    case tasksActionTypes.UPDATE_TASK:
    case tasksActionTypes.FETCH_TASKS_START:
      return {
        ...state,
        isFetching: true
      };
    case tasksActionTypes.FETCH_TASKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        tasks: action.payload
      };
    case tasksActionTypes.FETCH_TASKS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    case tasksActionTypes.CLEAR_TASKS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default taskReducer;
