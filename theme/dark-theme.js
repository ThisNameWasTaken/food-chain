import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#6DD8CC',
    },
    secondary: {
      main: '#FED860',
    },
    background: {
      default: '#232528',
    },
  },
});

export default darkTheme;
