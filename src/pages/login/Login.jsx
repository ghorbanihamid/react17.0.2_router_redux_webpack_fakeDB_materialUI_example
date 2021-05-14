import {Link, useLocation, useHistory }         from 'react-router-dom';
import React, { useState,useEffect,useContext } from 'react';
import { useDispatch, useSelector }             from "react-redux";
import {login,logout}                           from '../../actions/authActions';
import {Grid,Paper,Avatar,TextField,Button}     from '@material-ui/core';
import Typography                               from '@material-ui/core/Typography';
import LockOutLinedIcon                         from '@material-ui/icons/LockOutLined';
import { makeStyles }                           from '@material-ui/core/styles';
import {CommonUtil}                             from "../../helpers/CommonUtil";
import { DrawerContext }                        from "../../contexts/DrawerContext";


const useStyles = makeStyles((theme) => ({
  paperStyle: {
    width:'300px',
    height:'350px',
    color:'black',
    backgroundColor:'coral',
    margin: '20px auto',
    padding:30,
    verticalAlign:"middle"
  },
  avatarStyle: {
    backgroundColor:'coral'
  },
  validationError: {
    backgroundColor:'coral'
  },
  errorMessage: {
    color:'red',
  }
}));

export const Login = props => {

  const classes = useStyles();
  
  const [inputs, setInputs] = useState({
      username: '',
      password: ''
  });
  const { username, password } = inputs;
  const [submitted, setSubmitted] = useState(false); // to check form submitted or not
  const dispatch = useDispatch();
  const history = useHistory();
  const {closeDrawer,openDrawer} = useContext(DrawerContext);

  // reset login status
  useEffect(() => {         
        if(CommonUtil.isAuthenticated()) { 
          closeDrawer();  
          console.log('Login(), first logouting previous user!');
          dispatch(logout()); 
        }
      }, 
      []
  );

  const authState  = useSelector(state => state.auth);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  function handleLogin(e) {
    console.log('Login process started.');
    e.preventDefault();
    setSubmitted(true);
    if(username && password){      
      dispatch(login(username, password))
        .then(response => {          
          console.log(' Login.jsx handleLogin(), response:',response);
          if(response && !CommonUtil.isEmpty(response.data)) {
            console.log(' Login.jsx handleLogin(), login is success,  authState.data:',response.data);
            history.push("/dashboard");
            openDrawer();
            console.log(' handleLogin() pushed history to dashboard.');
          }
        })
        .catch(error => {
          console.log(' Login.jsx handleLogin(), login is success,  errorMessage:',error);
        });
      console.log('handleLogin() successfully done.');
    }
  }
  
  const handleResult = () => {    
    console.log('login.handleResult(), handleResult: ',authState );          
    if(authState && !CommonUtil.isEmpty(authState.errorMessage)) {
      console.log(' Login.jsx handleResult(), login failed,  authState.errorMessage:',authState.errorMessage);
      return <p>{authState.errorMessage}</p>
    }        
    return;
  }     

  return(
    <Grid>
      <Paper elevation={10} className={classes.paperStyle}>
        <Grid align='center'>
          <Avatar className={classes.avatarStyle}><LockOutLinedIcon/></Avatar>
          <h3>Sign In</h3>
        </Grid>
        <Typography component={'div'} className={classes.errorMessage}>
          {handleResult()}  
        </Typography>

        {submitted && !username &&
          <div className={classes.validationError}>Username is required</div>
        }
        <TextField type='text'     label='Username' placeholder='Enter username' name="username" value={username} onChange={handleChange} fullWidth required/>

        {submitted && !password &&
          <div className={classes.validationError}>Password is required</div>
        }
        <TextField type='password' label='password' placeholder='Enter password' name="password" value={password} onChange={handleChange} fullWidth required/>
        <Button type="submit" onClick={(event) => handleLogin(event)} variant="contained" style={{margin:'20px 0px 10px 0px'}} fullWidth>Login</Button>
        <Typography>
          <Link  to="/forgotpassword" >Forgot password?</Link >
        </Typography>
        <Typography style={{marginTop:'5px'}}>
          Don't have an account?
          <Link  to="/newUser"> Sign Up</Link >
        </Typography>
      </Paper>
    </Grid>
  )
};
