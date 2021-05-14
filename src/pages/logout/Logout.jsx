import React, {useContext, useEffect} from 'react';
import { useHistory}                  from 'react-router-dom';
import { useDispatch }                from "react-redux";
import {logout}                       from '../../actions/authActions';
import { DrawerContext }              from "../../contexts/DrawerContext";

function Logout () {

  const dispatch = useDispatch();
  const history = useHistory();
  const { closeDrawer } = useContext(DrawerContext);

  useEffect(
    () => {
      console.log('Logout process started.');      
      closeDrawer();  
      dispatch(logout())
        .then(() => {        
          history.push("/login");             
          console.log(' Logout() pushed login to history.');
        });
      console.log('Logout() successfully done.');
    }, 
    []
  );    

  return(
    <div>      
    </div>
  )
}
export { Logout };
