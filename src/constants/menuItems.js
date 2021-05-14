import DashboardIcon   from '@material-ui/icons/Dashboard';
import GroupAddIcon    from '@material-ui/icons/GroupAdd';
import GroupIcon       from '@material-ui/icons/Group';
import InfoIcon        from '@material-ui/icons/Info';
import ExitToAppIcon   from '@material-ui/icons/ExitToApp';



export const MenuList = [
  {
    route: "/dashboard",
    literal: 'Dashboard',
    Icon: DashboardIcon,
  },  
  {
    route: "/newUser",
    literal: 'New User',
    Icon: GroupAddIcon,
  },
  {
    route: "/usersList",
    literal: 'Users List',
    Icon: GroupIcon,
  },
  {
    route: "/about",
    literal: 'About',
    Icon: InfoIcon,
  },
  {
    route: "/logout",
    literal: 'Logout',
    Icon: ExitToAppIcon,
  },
];
