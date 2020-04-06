import userActionTypes from './user.types';

const INITIAL_STATE = {
  userToken: undefined,
  isSigning: false,
  errorMessage: undefined,
  userInfo: undefined,
  isLoggingOut: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SIGN_IN_START:
    case userActionTypes.SIGN_UP_START:
      return {
        ...state,
        isSigning: true
      };
    case userActionTypes.SIGN_IN_SUCCESS:
    case userActionTypes.SIGN_UP_SUCCESS:
      const { token, user } = JSON.parse(action.payload);
      return {
        ...state,
        isSigning: false,
        userToken: token,
        userInfo: user,
      };
    case userActionTypes.SIGN_IN_FAILURE:
    case userActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        isSigning: false,
        errorMessage: action.payload
      };
    case userActionTypes.LOG_OUT_USER_START:
      return {
        ...state,
        isLoggingOut: true
      };
    case userActionTypes.LOG_OUT_USER_SUCCESS:
      return INITIAL_STATE;
    case userActionTypes.LOG_OUT_USER_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        errorMessage: action.payload
      };
    case userActionTypes.SIGN_UP_START:
      return { ...state }
    case userActionTypes.SIGN_UP_SUCCESS:
      return { ...state }
    case userActionTypes.SIGN_UP_FAILURE:
      return { ...state }
    case userActionTypes.LOG_OUT_USER:
      return { ...state }

    default:
      return state
  }
}
