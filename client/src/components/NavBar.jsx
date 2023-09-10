import { useState } from 'react';
import { Button, Stack, Box } from '@mui/material';
import LoginModal from './LoginModal';

const NavBar = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleLoginButtonClick = () => {
    setLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <Box position='static' mx={2}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        spacing={2}
      >
        <Button
          variant='contained'
          color='primary'
          onClick={handleLoginButtonClick}
        >
          Login / Signup
        </Button>
      </Stack>
      <LoginModal open={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </Box>
  );
};

export default NavBar;
