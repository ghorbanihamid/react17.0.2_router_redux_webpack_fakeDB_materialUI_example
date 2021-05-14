import React, { useState,useEffect }      from 'react';
import { useDispatch, useSelector }       from "react-redux";
import { makeStyles }                     from '@material-ui/core/styles';
import {Grid}                             from '@material-ui/core';
import {Avatar}                           from '@material-ui/core';
import Typography                         from '@material-ui/core/Typography';
import DashboardIcon                      from '@material-ui/icons/Dashboard';
import { getDashboardData }               from '../../actions/dashboardActions';


const useStyles = makeStyles((theme) => ({
  div: {
    mposition: "relative", 
    width:'650px',
    height:'450px',
    color:'black',
    backgroundColor:'coral',
    margin: '20px auto',
    padding:20,
    verticalAlign:"middle"
  },
  avatar: {
    position: "relative"     
  }
}));

function Dashboard () {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const [dashData, setDashData] = useState({
    info: ''
  });

  
  
  useEffect(
    () => {
      dispatch(getDashboardData());
    }, 
    []
  );  

  return(
    <div className={classes.div}>
    <Grid align='center'>
      <Avatar className={classes.avatar}><DashboardIcon/></Avatar>      
      <Typography variant="h4">
        Dashboard
      </Typography>
    </Grid>
  </div>
  )
}
export default Dashboard;
