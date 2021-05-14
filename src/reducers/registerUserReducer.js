import { actionTypes }  from '../constants/actionTypes';

const initialSate = {
  submitting: false,
  data: null,
  successMessage: "",
  errorMessage: ""
}

const registerUserReducer = (state = initialSate, action) => {

  console.log('Register user Reducer called, current state : '+ JSON.stringify(state) +
              'new action : '+ JSON.stringify(action));

  const { type, payload } = action;

  switch (type) {

    case actionTypes.REGISTER_USER_SUBMITTING:
      console.log(`Register user Reducer called, current state is SUBMITTING: ${JSON.stringify(state)}, new action :${ JSON.stringify(action)}`);
      return {
        ...state,
        submitting: true,
        data: null,
        successMessage: "",
        errorMessage: ""
      };

    case actionTypes.REGISTER_USER_SUCCESS:
      console.log(`Register user Reducer called, state is REGISTER_USER_SUCCESS, payload : ${JSON.stringify(payload)}`);
      return {
        ...state,
        submitting: false,
        data: payload,
        successMessage: `User registered successfully with Id: ${payload.id}`,
        errorMessage: ""
      };

    case actionTypes.REGISTER_USER_FAIL:
      console.log(`Register user Reducer called, state is REGISTER_USER_FAIL, payload: ${JSON.stringify(payload)}`);
      return {
        ...state,
        submitting: false,        
        data: null,
        successMessage: "",
        errorMessage: payload        
      };

    default:
      return state;
  }
}
export default registerUserReducer