import { combineReducers }  from 'redux';
import authReducer          from './authReducer';
import dashboardReducer     from './dashboardReducer';
import registerUserReducer  from './registerUserReducer';
import usersListReducer     from './usersListReducer';

const rootReducer = combineReducers ({
  auth: authReducer,
  dashInfo: dashboardReducer,
  user: registerUserReducer,
  usersList: usersListReducer
});
export default rootReducer;
