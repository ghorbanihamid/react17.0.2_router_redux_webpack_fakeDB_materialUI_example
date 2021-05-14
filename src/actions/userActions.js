import { actionTypes }    from '../constants/actionTypes';
import { userService }    from '../services/userService';
import regeneratorRuntime from "regenerator-runtime";

export const registerUser = (user) => async dispatch => {
    try {
        dispatch({
            type: actionTypes.REGISTER_USER_SUBMITTING            
        });

        await userService.register(user)
            .then(response => {
                    console.log(`userActions.register(), service layer called result:${JSON.stringify(response)}`);
                    if(response && response.data){
                        console.log(`userActions.register(), service layer sucessfully called with result:${JSON.stringify(response.data)}`);
                        dispatch({
                            type: actionTypes.REGISTER_USER_SUCCESS,
                            payload: response.data
                        });                        
                    }
                    else {
                        console.log(`userActions.register(), service layer  returned error :${JSON.stringify(response.message)}`);
                        let responsemessage = '';
                        if(response && response.message){
                            responsemessage = response.message;
                        }
                        else {
                            responsemessage = "Api call doesn't have any response!!!";
                        }

                        dispatch({
                            type: actionTypes.REGISTER_USER_FAIL,
                            payload : responsemessage
                        });                                                 
                    }
                }
            );
    } 
    catch(e){
        dispatch({
            type: actionTypes.REGISTER_USER_FAIL            
        });
    } 
    
}

export const getUsersList = (page) => async dispatch => {
    try {    
        dispatch({
            type: actionTypes.GET_USERS_LIST_LOADING            
        });
        const perPage = 10;
        const offset = (page * perPage) - perPage;        
        await userService.getUsersList(offset)
                .then(response => {
                    console.log("userService.getUsersList()  sucessfully called, result :" + JSON.stringify(response));
                    if(response && response.data){
                        dispatch({
                            type: actionTypes.GET_USERS_LIST_SUCCESS,
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
                            type: actionTypes.GET_USERS_LIST_FAIL,
                            payload : responsemessage
                        });                                                 
                    }
                    
                }
        );    
    } 
    catch(e){
        dispatch({
            type: actionTypes.GET_USERS_LIST_FAIL            
        });
    }    
}
