// import config from 'config';
// import { authHeader } from '../_helpers';
import {CommonUtil}          from "../helpers/CommonUtil";
import {ApiCall}             from "../helpers/ApiCall";
import { serverConstants }   from '../constants/serverConstants';


export const authService = {
    login,
    logout
};

async function login(username, password) {
  let loginUrl = `${serverConstants.LOGIN_URL}?username='${username}'&password='${password}'`;
  console.log("authService.login() is called, url : " + loginUrl);
  // logout current user
  localStorage.clear();
  const response = await ApiCall.get(loginUrl);
  console.log("authService.login() response is: " + JSON.stringify(response));
  if (response && response.data) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(response.data));
    console.log("authService.login() user save in localStorage is: " + JSON.stringify(response.data));
  }
  return response;
}

async function logout() {
  console.log("authService.logout() called " );
  const userStr = localStorage.getItem('user');
  //localStorage.removeItem('user'); // remove user from local storage to log user out                      
  localStorage.clear(); // remove data from local storage to log user out  
  
  let response = "";
  if(!CommonUtil.isEmpty(userStr)){
    let logoutUrl = `${serverConstants.LOGOUT_URL}?username=`+ JSON.parse(userStr).username;
    console.log("logout url : " + logoutUrl);
    response = await ApiCall.get(logoutUrl);
    console.log("authService.logout() successfullty called, result: ", response);
  }  
  return Promise.resolve(response);
}
