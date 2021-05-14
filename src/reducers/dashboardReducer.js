import { actionTypes }  from '../constants/actionTypes';

const initialSate = {
  loading: false,
  data: {},
  errorMessage:""

}

const dashboardReducer = (state = initialSate, action) => {

  console.log('dashboard user Reducer called, current state : '+ JSON.stringify(state) +'new action : '+ JSON.stringify(action));

  const { type, payload } = action;
  
  switch (type) {

    case actionTypes.DASHBAORD_LOADING:
      console.log(`dashboard Reducer called, current state is LOADING: ${JSON.stringify(state)}, new action :${ JSON.stringify(action)}`);
      return {
        ...state,
        loading: true,
        errorMessage: ""
      };

    case actionTypes.DASHBAORD_SUCCESS:
      console.log(`dashboard Reducer called, current state is SUCCESS: ${JSON.stringify(state)}, new action :${ JSON.stringify(action)}`);
      return {
        ...state,
        loading: false,
        data: payload,
        errorMessage: ""
      };
      
    case actionTypes.DASHBAORD_FAIL:
      console.log(`dashboard Reducer called, current state is FAIL: ${JSON.stringify(state)}, new action :${ JSON.stringify(action)}`);
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
export default dashboardReducer