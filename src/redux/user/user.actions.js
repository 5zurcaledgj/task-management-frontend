import userActionTypes from './user.types';
import { clearTasks } from '../tasks/tasks.actions';

export const signInStart = () => ({
  type: userActionTypes.SIGN_IN_START
});

export const signInSuccess = userInfo => ({
  type: userActionTypes.SIGN_IN_SUCCESS,
  payload: userInfo
});

export const signInFailure = err => ({
  type: userActionTypes.SIGN_IN_FAILURE,
  payload: err
});

export const signUpStart = () => ({
  type: userActionTypes.SIGN_UP_START
});

export const signUpSuccess = userInfo => ({
  type: userActionTypes.SIGN_UP_SUCCESS,
  payload: userInfo
});

export const signUpFailure = err => ({
  type: userActionTypes.SIGN_UP_FAILURE,
  payload: err
});

export const logoutUserStart = () => ({
  type: userActionTypes.LOG_OUT_USER_START
});

export const logoutUserSuccess = () => ({
  type: userActionTypes.LOG_OUT_USER_SUCCESS
});

export const logoutUserFailure = err => ({
  type: userActionTypes.LOG_OUT_USER_FAILURE,
  payload: err
});

const API_BASE_URL = 'https://cors-anywhere.herokuapp.com/https://aqueous-beach-21150.herokuapp.com';
const fetchInfoFromApi = async (endpoint, requestOptions, success, failure, dispatch) => {
  try {
    const response = await fetch(API_BASE_URL + endpoint, requestOptions);
    console.log(response)
    if (200 === response.status) {
      const result = await response.text();
      console.log(result)
      success.forEach(fnc => {
        dispatch(fnc(result));
      });

      return;
    }

    dispatch(failure('API return non OK status'));
  } catch (e) {
    dispatch(failure(e));
  }
}

export const signInStartAsync = userInfo => {
  return dispatch => {
    dispatch(signInStart());

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(userInfo);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'manual'
    };

    return fetchInfoFromApi('/users/login', requestOptions, [signInSuccess], signInFailure, dispatch)
  };
};

export const logoutUserStartAsync = userToken => {
  return dispatch => {

    dispatch(logoutUserSuccess());
    dispatch(clearTasks());

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + userToken);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'manual'
    };

    return fetch(API_BASE_URL + '/users/login', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(e => console.log(e));
  };
}

export const signUpStartAsync = userInfo => {
  return dispatch => {
    dispatch(signUpStart());

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(userInfo);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'manual'
    };

    return fetchInfoFromApi('/users', requestOptions, [signUpSuccess], signUpFailure, dispatch);
  };
}
