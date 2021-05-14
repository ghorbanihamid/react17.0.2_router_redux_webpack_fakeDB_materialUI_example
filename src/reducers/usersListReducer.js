import { actionTypes }  from '../constants/actionTypes';

const initialSate = {
  loading: false,
  data: {},
  errorMessage:""

}

const usersListReducer = (state = initialSate, action) => {

  console.log('UsersList user Reducer called, current state : '+ JSON.stringify(state) +'new action : '+ JSON.stringify(action));

  const { type, payload } = action;
  
  switch (type) {

    case actionTypes.GET_USERS_LIST_LOADING:
      console.log(`UsersList Reducer called, current state is LOADING: ${JSON.stringify(state)}, new action :${ JSON.stringify(action)}`);
      return {
        ...state,
        loading: true,
        errorMessage: ""
      };

    case actionTypes.GET_USERS_LIST_SUCCESS:
      console.log(`UsersList Reducer called, current state is SUCCESS: ${JSON.stringify(state)}, new action :${ JSON.stringify(action)}`);
      return {
        ...state,
        loading: false,
        data: payload,
        errorMessage: ""
      };
      
    case actionTypes.GET_USERS_LIST_FAIL:
      console.log(`UsersList Reducer called, current state is FAIL: ${JSON.stringify(state)}, new action :${ JSON.stringify(action)}`);
      return {
        ...state,
        loading: false,
        data: null,
        errorMessage: "unable to get user list!"
      };
      
    default:
      return state;
  }
}
export default usersListReducer