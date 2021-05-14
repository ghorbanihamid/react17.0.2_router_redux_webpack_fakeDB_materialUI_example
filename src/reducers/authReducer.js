import { actionTypes }  from '../constants/actionTypes';

const initialSate = {
  submitting: false,
  data: null,
  errorMessage: ""
}

const authReducer = (state = initialSate, action) => {

  console.log('auth Reducer called, current state : '+ JSON.stringify(state) +
              'new action : '+ JSON.stringify(action));

  const { type, payload } = action;

  switch (type) {

    case actionTypes.LOGIN_SUBMITTING:
      console.log(`auth Reducer called, current state is SUBMITTING: ${JSON.stringify(state)}, new action :${ JSON.stringify(action)}`);
      return {
        ...state,
        submitting: true,
        data: null,
        errorMessage: ""
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        submitting: false,
        data: payload,
        errorMessage: ""
      };

    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        submitting: false,        
        data: null,
        errorMessage: payload    
      };

    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        submitting: false,
        data: payload,
        errorMessage: ""
      };
    case actionTypes.LOGOUT_FAIL:
      return {
        ...state,
        submitting: false,        
        data: null,
        errorMessage: payload 
      };
    default:
      return state;
  }
}
export default authReducer;