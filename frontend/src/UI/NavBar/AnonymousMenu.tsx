import {Button, Grid, styled} from '@mui/material';
import {NavLink} from 'react-router-dom';

const ActiveLink = styled(NavLink)({
  borderTop: '1px solid transparent',
  borderRadius: '0',
  transition: 'border-color 0.3s ease',
  '&.active': {
    borderTop: '1px solid #fff',
    borderRadius: '0',
  },
  '&:hover': {
    textShadow: '1px 1px 1px rgba(255, 255, 255, 0.3)',
    backgroundColor: 'transparent !important',
  },
});

const AnonymousMenu = () => {
  return (
    <Grid item>
      <Button component={ActiveLink} to="/register" color="inherit">
        Регистрация
      </Button>
      <Button component={ActiveLink} to="/login" color="inherit">
        Авторизация
      </Button>
    </Grid>
  );
};

export default AnonymousMenu;