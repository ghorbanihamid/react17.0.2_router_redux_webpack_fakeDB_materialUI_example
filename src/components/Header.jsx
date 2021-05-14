import React, { useContext }          from 'react';
import { useDispatch, useSelector }   from "react-redux";
import AppBar                         from "@material-ui/core/AppBar";
import Toolbar                        from "@material-ui/core/Toolbar";
import IconButton                     from "@material-ui/core/IconButton";
import MenuIcon                       from "@material-ui/icons/Menu";
import ChevronLeftIcon                from "@material-ui/icons/ChevronLeft";
import Typography                     from '@material-ui/core/Typography';
import { makeStyles }                 from '@material-ui/core/styles';
import { DrawerContext }              from "../contexts/DrawerContext";
import {CommonUtil}                   from "../helpers/CommonUtil";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.warning.dark,
    color: 'black',
    zIndex: theme.zIndex.drawer + 1
  },
  icon: {
    padding: theme.spacing(1),
  },
  title: {
    margin: "auto",
  }
}));

const Header = (props) => {

  const classes = useStyles();
  const {drawerIsOpen,toggleDrawerIsOpen} = useContext(DrawerContext); // to use or drawerIsOpenContext 
  const authState  = useSelector(state => state.auth);

  const handleToggle = () => {
    console.log('Header handleToggle called, drawerIsOpen state was :',drawerIsOpen)
    toggleDrawerIsOpen(!drawerIsOpen);    
  };

  const handleDrawerIcon = () => {
    console.log('Header handleDrawerIcon called  authState:',authState);
    if(authState && CommonUtil.isAuthenticated()){
      console.log('Header handleDrawerIcon we should see Icon ');
      return <IconButton color="inherit" aria-label="open drawer" className={classes.icon} onClick={handleToggle} >
                {drawerIsOpen ? <ChevronLeftIcon /> : <MenuIcon />}
              </IconButton>  
    }  
  }
  return(
    <AppBar className={classes.appBar}>
      <Toolbar>        
        {handleDrawerIcon()}
        <Typography variant="h6" className={classes.title}>
          React Example(Redux, Router, webpack, material-ui, ...)
        </Typography>
      </Toolbar>
    </AppBar>
  );

};
export default Header;
