import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  bottomNavigation: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    willChange: 'transform',
    transform: 'translateY(0%)',
    transition: 'transform .2s ease',
  },
  bottomNavigationHidden: {
    transform: 'translateY(100%)',
  },
}));
