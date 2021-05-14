// import config from 'config';
import {ApiCall}                 from "../helpers/ApiCall";
import { serverConstants }       from '../constants/serverConstants';

var apiUrl = 'http://locahost:8080';

export const  getDashboardInfo = () => {
    
    console.log("dashService.getDashboardInfo() calling url : " + dashInfoUrl);
    return ApiCall.get(serverConstants.DASHBOARD_URL)
        .then(response => {
              console.log("dashService.getDashboardInfo() successfully called: " + JSON.stringify(response));
              return usersList;
            }
        );
}
