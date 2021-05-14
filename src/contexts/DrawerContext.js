import React, { useState,createContext }    from 'react';


export const DrawerContext = createContext(); // this is the equivalent to the createStore method of Redux

const DrawerContextProvider = (props) => {

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const toggleDrawerIsOpen = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  const updateDrawerIsOpen = (isOpen) => {
    setDrawerIsOpen(isOpen);
  };

  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };

  const openDrawer = () => {
    setDrawerIsOpen(false);
  };

  return (
    <DrawerContext.Provider value={{ drawerIsOpen, toggleDrawerIsOpen, closeDrawer,openDrawer,updateDrawerIsOpen}}>
      {props.children}
    </DrawerContext.Provider>
  );
};

export default DrawerContextProvider;