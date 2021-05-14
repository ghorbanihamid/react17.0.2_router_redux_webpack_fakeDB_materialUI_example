import { RepeatOneSharp } from '@material-ui/icons';
import { actionTypes }  from '../constants/actionTypes';
import { authService }  from '../services/authService';

export const login = (username, password) => {
    return async dispatch => {  
        const response = await authService.login(username, password);
        console.log("authActions.login()  sucessfully called, result :" + JSON.stringify(response));
        if(response && response.data) {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                payload: response.data
            });
            return Promise.resolve(response);
        }
        else {
            let responsemessage = '';
            if(response && response.message){
                responsemessage = response.message;
            }
            else {
                responsemessage = "authActions.login(), login api doesn't have any response!!!";
            }
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                payload : responsemessage
            });
            return Promise.reject(responsemessage);                            
        }
    }                    
}

export const logout = () => {
    return async dispatch => {  

        const response = await authService.logout();   
        console.log("authActions, authService.logout()  sucessfully called.", response);
        dispatch({
            type: actionTypes.LOGOUT_SUCCESS,
            payload : ''
        });        
        return Promise.resolve(response);
    }
}
