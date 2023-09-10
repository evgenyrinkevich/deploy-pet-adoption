import { useState } from 'react';
import { useLoginMutation, useSignupMutation } from '../store/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const LoginModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [signup, { isLoading: isSignupLoading }] = useSignupMutation();

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');

  const handleLoginChange = (field, value) => {
    setLoginData((prevData) => ({ ...prevData, [field]: value }));
    setLoginError('');
  };

  const handleSignupChange = (field, value) => {
    setSignupData((prevData) => ({ ...prevData, [field]: value }));
    setSignupError('');
  };

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      setLoginError('Email and password are required.');
      return;
    }
    try {
      const res = await login(loginData).unwrap();
      dispatch(setCredentials({ ...res, email: loginData.email }));
      onClose();
    } catch (err) {
      console.log(err);
      if (!err?.status) {
        setLoginError('No Server Response');
      } else if (err.status === 403) {
        setLoginError('Wrong Username or Password');
      } else if (err.status === 401) {
        setLoginError('Unauthorized');
      } else {
        setLoginError('Login Failed');
      }
    }
  };

  const handleSignup = async () => {
    if (
      !signupData.email ||
      !signupData.password ||
      !signupData.confirmPassword ||
      !signupData.firstName ||
      !signupData.lastName ||
      !signupData.phoneNumber
    ) {
      setSignupError('All fields are required.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      setSignupError('Invalid email format.');
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setSignupError('Passwords do not match.');
      return;
    }

    try {
      const result = await signup({
        email: signupData.email,
        password: signupData.password,
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        phoneNumber: signupData.phoneNumber,
      });
      toggleForm();
      // open();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleForm = () => {
    setIsLoginForm((prevIsLoginForm) => !prevIsLoginForm);
    setLoginError('');
    setSignupError('');
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxWidth: 400,
          width: '90%',
        }}
      >
        <IconButton
          edge='end'
          color='inherit'
          onClick={onClose}
          aria-label='close'
          sx={{
            marginLeft: 'auto',
            position: 'absolute',
            top: 8,
            right: 16,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant='h6'>
          {isLoginForm ? 'Login' : 'Sign Up'}
        </Typography>
        {isLoginForm ? (
          <>
            <TextField
              label='Email'
              fullWidth
              variant='outlined'
              margin='normal'
              value={loginData.email}
              onChange={(e) => handleLoginChange('email', e.target.value)}
            />
            <TextField
              label='Password'
              fullWidth
              variant='outlined'
              margin='normal'
              type='password'
              value={loginData.password}
              onChange={(e) => handleLoginChange('password', e.target.value)}
            />
            <Button variant='contained' color='primary' onClick={handleLogin}>
              Login
            </Button>
            {loginError && <Alert severity='error'>{loginError}</Alert>}
            <Typography>
              Do not have an account?{' '}
              <Button variant='text' onClick={toggleForm}>
                Sign Up
              </Button>
            </Typography>
          </>
        ) : (
          <>
            <TextField
              label='Email'
              fullWidth
              variant='outlined'
              margin='normal'
              value={signupData.email}
              onChange={(e) => handleSignupChange('email', e.target.value)}
            />
            <TextField
              label='Password'
              fullWidth
              variant='outlined'
              margin='normal'
              type='password'
              value={signupData.password}
              onChange={(e) => handleSignupChange('password', e.target.value)}
            />
            <TextField
              label='Confirm Password'
              fullWidth
              variant='outlined'
              margin='normal'
              type='password'
              value={signupData.confirmPassword}
              onChange={(e) =>
                handleSignupChange('confirmPassword', e.target.value)
              }
            />
            <TextField
              label='First Name'
              fullWidth
              variant='outlined'
              margin='normal'
              value={signupData.firstName}
              onChange={(e) => handleSignupChange('firstName', e.target.value)}
            />
            <TextField
              label='Last Name'
              fullWidth
              variant='outlined'
              margin='normal'
              value={signupData.lastName}
              onChange={(e) => handleSignupChange('lastName', e.target.value)}
            />
            <TextField
              label='Phone Number'
              fullWidth
              variant='outlined'
              margin='normal'
              type='number'
              value={signupData.phoneNumber}
              onChange={(e) =>
                handleSignupChange('phoneNumber', e.target.value)
              }
            />
            <Button variant='contained' color='primary' onClick={handleSignup}>
              Sign Up
            </Button>
            {signupError && <Alert severity='error'>{signupError}</Alert>}
            <Typography>
              Already have an account?{' '}
              <Button variant='text' onClick={toggleForm}>
                Login
              </Button>
            </Typography>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default LoginModal;
