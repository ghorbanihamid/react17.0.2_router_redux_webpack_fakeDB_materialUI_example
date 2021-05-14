import { actionTypes }       from '../constants/actionTypes';
import {getDashboardInfo}    from '../services/dashboardService';
import regeneratorRuntime    from "regenerator-runtime";


export const getDashboardData = () => async dispatch => {
    try {    
        dispatch({
            type: actionTypes.DASHBOARD_LOADING            
        });
        await getDashboardInfo()
                .then(response => {
                    console.log("dashboardService.getDashboardData()  sucessfully called, result :" + JSON.stringify(response));
                    if(response && response.data){
                        dispatch({
                            type: actionTypes.DASHBOARD_SUCCESS,
                            payload: response.data
                        });                        
                    }
                    else {
                        let responsemessage = '';
                        if(response && response.message){
                            responsemessage = response.message;
                        }
                        else {
                            responsemessage = "Api call doesn't have any response!!!";
                        }

                        dispatch({
                            type: actionTypes.DASHBOARD_FAIL,
                            payload : responsemessage
                        });                                                 
                    }
                    
                }
        );    
    } 
    catch(e){
        dispatch({
            type: actionTypes.DASHBOARD_FAIL            
        });
    }    
}
