// import config from 'config';
import {ApiCall}             from "../helpers/ApiCall";
import { serverConstants }   from '../constants/serverConstants';

export const userService = {
    register,
    getUsersList,
};

function register(userInfo) {    
    console.log("userService.register() calling url");
    return ApiCall.post(serverConstants.REGISTER_USER_URL,userInfo)
        .then(response => {
              console.log("userService.register(), ApiCall.post called: " + JSON.stringify(response));
              return response;
            }
        );
}

function getUsersList(page) {    
    console.log("userService.getUsersList() calling url");
    return ApiCall.get(serverConstants.USERS_LIST_URL,page)
        .then(usersList => {
              console.log("authService.getUsersList() successfully called: " + JSON.stringify(usersList));
              return usersList;
            }
        );
}
