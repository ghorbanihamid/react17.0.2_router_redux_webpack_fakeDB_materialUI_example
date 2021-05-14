import React                                  from 'react';
import { Link, useLocation }                  from "react-router-dom";
import List                                   from "@material-ui/core/List";
import ListItem                               from "@material-ui/core/ListItem";
import ListItemIcon                           from "@material-ui/core/ListItemIcon";
import ListItemText                           from "@material-ui/core/ListItemText";
import Grid                                   from "@material-ui/core/Grid";
import {createStyles,darken,makeStyles,Theme} from "@material-ui/core/styles";
import { MenuList }                           from "../constants/menuItems";

const useStyles = makeStyles((theme) => createStyles({
  padding: {
    padding: 0,
  },
  button: {
    "&:hover": {
      backgroundColor: theme.palette.success.light,
      color: theme.palette.common.white,
    },
    "&$selected": {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.common.white,
    },
  },
  selected: {},
  listIcon: {
    minWidth: "auto",
    paddingRight: theme.spacing(2),
  },
  icon: {
    color: theme.palette.secondary.main,
  }

}));

const MenuItemsList = () => {
  const classes = useStyles();

  const { pathname } = useLocation();

  return (
    <Grid>
      <List className={classes.padding}>
        {
          MenuList.map(
            ({ literal, route, Icon }) => (
              <Link to={route} key={route}> {/* key={route} is just for preventing from this warning("each child in a list should have a unique key prop.")*/}
                <ListItem button selected={pathname === route} classes={{selected: classes.selected,button: classes.button,}}>
                  <ListItemIcon className={classes.listIcon}>
                    <Icon className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText primary={literal} />
                </ListItem>
              </Link>
            )
          )
        }
      </List>
    </Grid>
  );
};

export default MenuItemsList;
