import React, { useState ,useEffect}         from 'react';
import { Link }                              from 'react-router-dom';
import { useDispatch, useSelector }          from 'react-redux';
import {Grid,Paper,Avatar,TextField,Button}  from '@material-ui/core';
import LockOutLinedIcon                      from '@material-ui/icons/LockOutLined';
import { makeStyles }                        from '@material-ui/core/styles';
import Typography                            from '@material-ui/core/Typography';
import { registerUser }                      from '../../actions/userActions';
import {CommonUtil}                          from "../../helpers/CommonUtil";

function RegisterNewUser() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    });
    const { firstName, lastName, username, password } = user;
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }    

    const userState = useSelector((state) => state.user);

    useEffect(
      () => {
        console.log('showing RegisterNewUser form.');      
        userState.successMessage = "";
        userState.errorMessage = "";        
      }, 
      []
    );    

    function handleSubmit(e) {
      console.log('RegisterNewUser.Resgister process started.');
      e.preventDefault();
      setSubmitted(true);
      if(firstName&& lastName&& username && password){        
        dispatch(registerUser(user));   // dispatch triggers that a state change, calling registerUser from userActions
        console.log('RegisterNewUser.handleSubmit() successfully done.');
      }
    }
    const showResult = () => {
      console.log('RegisterNewUser.showResult(), state: ',userState );      
      if(userState){
        if(!CommonUtil.isEmpty(userState.data)){      
          console.log('RegisterNewUser.showResult(), state: ',userState.data );
          console.log('RegisterNewUser.showResult(), userid: ',userState.data.id );          
          return <Typography component={'div'} className={classes.successMessage}><p>{userState.successMessage}</p></Typography>          
        }
        if(!CommonUtil.isEmpty(userState.errorMessage)) {
          return <Typography component={'div'} className={classes.errorMessage}><p>{userState.errorMessage}</p></Typography>
        }
      }
      return;
    }     

    const useStyles = makeStyles((theme) => ({
      paperStyle: {
        width:'500px',
        height:'450px',
        color:'black',
        backgroundColor:'coral',
        margin: '20px auto',
        padding:20,
        verticalAlign:"middle"
      },
      avatarStyle: {
        backgroundColor:'coral'
      },
      validationError: {
        backgroundColor:'coral'
      },
      successMessage: {
        color:'green',
      },
      errorMessage: {
        color:'red',
      }

    }));
    const classes = useStyles();

    return (
      <Grid>
        <Paper elevation={10} className={classes.paperStyle}>
          <Grid align='center'>
            <Avatar className={classes.avatarStyle}><LockOutLinedIcon/></Avatar>
            <h2>Register new user</h2>
          </Grid>
          {showResult()}
          <form name="form" onSubmit={handleSubmit}>
            {submitted && !firstName &&
              <div className={classes.validationError}>First Name is required</div>
            }
            <TextField type='text'     label='First Name' placeholder='Enter First Name' name="firstName" value={firstName} onChange={handleChange} fullWidth required/>
            {submitted && !lastName &&
              <div className={classes.validationError}>Last Name is required</div>
            }
            <TextField type='text'     label='Last Name'  placeholder='Enter Last Name'  name="lastName" value={lastName}   onChange={handleChange} fullWidth required/>
            {submitted && !username &&
              <div className={classes.validationError}>Username is required</div>
            }
            <TextField type='text'     label='Username'   placeholder='Enter username'   name="username" value={username}   onChange={handleChange} fullWidth required/>
            {submitted && !password &&
              <div className={classes.validationError}>password is required</div>
            }
            <TextField type='password' label='password'   placeholder='Enter password'   name="password" value={password}   onChange={handleChange} fullWidth required/>
            <Button type="submit" onClick={(event) => handleSubmit(event)} variant="contained" style={{margin:'30px 0px 10px 0px'}} fullWidth>Register</Button>
            <Button variant="contained" style={{margin:'5px 0px 10px 0px'}} fullWidth>
              <Link to="/login" className="btn btn-link">Cancel</Link>
            </Button>

          </form>
        </Paper>
      </Grid>
    );
}

export { RegisterNewUser };
