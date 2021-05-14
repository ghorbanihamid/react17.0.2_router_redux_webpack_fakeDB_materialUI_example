
import React                from 'react';
import {Grid,Paper,Avatar}  from '@material-ui/core';
import InfoIcon             from '@material-ui/icons/Info';

export const About = () => {

  const paperStyle ={
    width:'500px',
    height:'250px',
    color:'black',
    backgroundColor:'coral',
    margin: '20px auto',
    padding:20,
    verticalAlign:"middle"
  };
  const avatarStyle ={backgroundColor:'coral'};

  return(    
    <Grid>
    <Paper elevation={10} style={paperStyle}>
      <Grid align='center'>
        <Avatar style={avatarStyle}><InfoIcon/></Avatar>
        <h2>About us</h2>
      </Grid>
      
    </Paper>
  </Grid>
  )
}
