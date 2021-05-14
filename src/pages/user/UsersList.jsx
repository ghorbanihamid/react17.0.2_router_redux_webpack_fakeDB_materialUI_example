import React, { useEffect }           from 'react';
import { useDispatch, useSelector }   from "react-redux";
import { getUsersList }               from '../../actions/userActions';
import {Grid}                         from '@material-ui/core';
import {Avatar}                       from '@material-ui/core';
import { makeStyles }                 from '@material-ui/core/styles';
import GroupIcon                      from '@material-ui/icons/Group';
import { DataGrid }                   from '@material-ui/data-grid';
import {CommonUtil}                   from "../../helpers/CommonUtil";
import lodash                         from "lodash"

const useStyles = makeStyles((theme) => ({
  div: {
    position: "relative", 
    width:'650px',
    height:'450px',
    color:'black',
    backgroundColor:'coral',
    margin: '20px auto',
    padding:20,
    verticalAlign:"middle",
    // border:'solid',
    // borderColor: 'red',
    // borderWidth: '7px'
   
  },  
  avatar: {
    position: "relative"     
  },
  dataGrid: {    
    width:'650px',
    height:'350px',
    color:'black'   
  }  
}));


function UsersList () {
  const classes = useStyles();
  const columns = [
                    { field: 'id', headerName: 'ID', width: 70 }, 
                    { field: 'firstName', headerName: 'First Name', width: 150 }, 
                    { field: 'lastName', headerName: 'Last Name', width: 150 }, 
                    { field: 'username', headerName: 'username', width: 150 } 
                  ]
  let rows = [
                  { id: 1, firstName: 'hamid',lastName: 'Ghorbani', username: 'hamid' }
                  
               ]

  const dispatch = useDispatch();
              
  const usersListState = useSelector((state) => state.usersList);
  
  useEffect(
    () => {
      dispatch(getUsersList(1));
    }, 
    []
  );   
  console.log('********************',JSON.stringify(usersListState.data));

  const showData = () => {

    if(usersListState){
      if(!lodash.isEmpty(usersListState.data)){      
        rows = usersListState.data;
        return <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection className={classes.dataGrid} />
      }
      if(!CommonUtil.isEmpty(usersListState.errorMessage)) {
        return <p>{usersListState.errorMessage}</p>;
      }
      if(usersListState.loading) {
        return <p>Loading...</p>;
      }
    }
    return <p>Something in code is wrong and data isn't returning!!!, follwoing is fixed data:</p>;                          
  } 

  return(
    <div className={classes.div}>
      <Grid align='center'>
        <Avatar className={classes.avatar}><GroupIcon/></Avatar>
        <h2>Users List</h2>
      </Grid>
      {showData()}
    </div>
  )
}
export { UsersList };
