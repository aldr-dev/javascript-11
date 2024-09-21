import {AppBar, Toolbar, Container, Typography, Box, Grid} from '@mui/material';
import {NavLink} from 'react-router-dom';
import AnonymousMenu from './AnonymousMenu';
import {useAppSelector} from '../../app/hooks';
import StorefrontIcon from '@mui/icons-material/Storefront';
import {selectUser} from '../../features/users/usersSlice';
import UserMenu from './UserMenu';

const NavBar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="static" sx={{backgroundColor: '#1976D2', mb: 3, p: .4}}>
      <Toolbar>
        <Container maxWidth="lg">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Box component={NavLink} to="/" display="flex" alignItems="center" sx={{textDecoration: 'none', color: '#fff'}}>
                  <StorefrontIcon sx={{fontSize: 50}} />&nbsp;
                <Typography variant="h5" component="span">
                  Flea Market
                </Typography>
              </Box>
            </Grid>
            {user ? (<UserMenu user={user}/>): (<AnonymousMenu />)}
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;