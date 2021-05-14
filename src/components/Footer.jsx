import React             from 'react';
import Typography        from '@material-ui/core/Typography';
import { makeStyles }    from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    background: theme.palette.warning.light,
    color: theme.palette.primary.dark,
    padding: theme.spacing(2),
  }
}));

const Footer = (props) => {
  const classes = useStyles();
  
  return(
    <div className={classes.footer}>
      <Typography variant="h6">Footer</Typography>
    </div>
  )

}
export default Footer;
