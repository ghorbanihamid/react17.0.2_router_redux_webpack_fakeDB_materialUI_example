import React                               from 'react';
import {Toolbar}                           from '@material-ui/core';
import { makeStyles }                      from '@material-ui/core/styles';
import Header                              from './Header';
import Footer                              from './Footer';
import SideBar                             from './SideBar';
import {CommonUtil}                        from "../helpers/CommonUtil";
import DrawerContextProvider               from "../contexts/DrawerContext";
import                                          '../styles/App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  toolbar: theme.mixins.toolbar,
  container: {
    display: "flex",
    flex: 1,
    // border:'solid',
    // borderColor: 'red',
    // borderWidth: '7px'
  },
  main: {
    flex: 1    
  }
}));

function Layout ({children}) {
  const classes = useStyles();
  
  return (
    <DrawerContextProvider>  {/* To be able to pass "drawerIsOpen" data between Header and Sidebar components */}
      <div className={classes.root}>
        <Toolbar/>
        <Header/>
        <div className={classes.container}>   
          {CommonUtil.isAuthenticated() && <SideBar /> }    
          {console.log(children)}   
          <div className={classes.toolbar} />
          <main className={classes.main}>{children}</main>
        </div>
        <Footer />
      </div>
    </DrawerContextProvider>
  )
}
export default Layout;
