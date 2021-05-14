import React, { useContext,useEffect } from 'react';
import { useSelector }       from "react-redux";
import Drawer                from "@material-ui/core/Drawer";
import MenuItemsList         from './MenuItemsList';
import { makeStyles }        from "@material-ui/core/styles";
import { DrawerContext }     from "../contexts/DrawerContext";
import {CommonUtil}          from "../helpers/CommonUtil";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    position: "relative", 
    border:'solid',
    borderColor: 'red',
    borderWidth: '7px'
   
  },  
  sidebarOpend: {
    position: "relative", 
    width: "240px"    
  },
  sidebarClosed: {
    position: "relative", 
    width: theme.spacing(7) + 1    
  },

  drawer: {  
    background: "#D8DCD6",
    position: "static"    
  },
  closed: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7) + 1,
    overflowX: "hidden",
  },
  opened: {
    width: "240px",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

function SideBar () {

  const classes = useStyles();
  const {drawerIsOpen,toggleDrawerIsOpen} = useContext(DrawerContext); // allows us to consume the value of DrawerContext   

  return (
    <div id="drawer-container" className={drawerIsOpen ? classes.sidebarOpend : classes.sidebarClosed}>      
      <Drawer
          variant={"persistent"}
          open={ drawerIsOpen}
          anchor="left"
          PaperProps={{ style: { position: 'absolute' } }}
          BackdropProps={{ style: { position: 'absolute' } }}
          ModalProps={{
            container: document.getElementById('drawer-container'),
            style: { position: 'absolute' }
          }}
          className={classes.drawer, drawerIsOpen ? classes.opened : classes.closed}
      >
          <MenuItemsList />
      </Drawer>
    </div>
  );  
}
export default SideBar;
