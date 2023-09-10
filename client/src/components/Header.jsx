import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from '../store/authSlice';
import { useLogoutMutation } from '../store/authApiSlice';
import LoginModal from './LoginModal';

const Header = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <>
      {token ? (
        <Box mt={4} mb={2}>
          <AppBar position='static'>
            <Toolbar>
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                {user?.firstName} {user?.lastName}
              </Typography>
              {user?.isAdmin && (
                <Button color='inherit' component={RouterLink} to='/admin'>
                  Admin
                </Button>
              )}

              <Button color='inherit' component={RouterLink} to='/search'>
                Search
              </Button>
              <Button color='inherit' component={RouterLink} to='/my-pets'>
                My Pets
              </Button>
              <Button color='inherit' component={RouterLink} to='/profile'>
                Profile
              </Button>
              <Button color='inherit' onClick={handleLogout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      ) : (
        <Box display='flex' flexDirection='row' justifyContent='space-between'>
          <Button
            variant='contained'
            color='primary'
            component={RouterLink}
            to='/'
          >
            Home Page
          </Button>
          <Button
            variant='contained'
            color='primary'
            component={RouterLink}
            to='/search'
          >
            Search Page
          </Button>
          <LoginModal open={isLoginModalOpen} onClose={handleCloseLoginModal} />
        </Box>
      )}
    </>
  );
};

export default Header;
