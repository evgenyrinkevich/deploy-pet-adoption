import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetUserByIdQuery } from '../store/usersApiSlice';
import { selectCurrentUser } from '../store/authSlice';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useUpdateUserMutation } from '../store/usersApiSlice';

const UserProfile = () => {
  const user = useSelector(selectCurrentUser);
  const { data } = useGetUserByIdQuery(user?.id);
  const [updateUser, { isLoading: isUpdateUserLoading }] =
    useUpdateUserMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    bio: '',
  });

  useEffect(() => {
    if (data) {
      setFormData({
        email: data.user.email || '',
        firstName: data.user.firstName || '',
        lastName: data.user.lastName || '',
        phoneNumber: data.user.phoneNumber || '',
        bio: data.user.bio || '',
      });
    }
  }, [data]);

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: '',
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      validationErrors.password = 'Password is required';
    }
    if (!formData.firstName) {
      validationErrors.firstName = 'First Name is required';
    }
    if (!formData.lastName) {
      validationErrors.lastName = 'Last Name is required';
    }

    // Set validation errors and return if there are errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Perform form submission logic with formData
    console.log('User data:', formData);
    try {
      const result = await updateUser({ ...formData, id: user.id });
      console.log(result);
    } catch (error) {
      console.log(error);
    }

    navigate('/');
  };

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' align='center' mt={3} mb={2}>
        User Profile
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <TextField
          fullWidth
          label='Email'
          variant='outlined'
          margin='normal'
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          fullWidth
          label='Password'
          variant='outlined'
          margin='normal'
          type='password'
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
          fullWidth
          label='First Name'
          variant='outlined'
          margin='normal'
          value={formData.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          fullWidth
          label='Last Name'
          variant='outlined'
          margin='normal'
          value={formData.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
          fullWidth
          label='Phone Number'
          variant='outlined'
          margin='normal'
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
        />
        <TextField
          fullWidth
          label='Short Bio'
          variant='outlined'
          margin='normal'
          multiline
          rows={3}
          value={formData.bio}
          onChange={(e) => handleInputChange('bio', e.target.value)}
        />
        <Box mt={3} textAlign='center'>
          <Button type='submit' variant='contained' color='primary'>
            Save
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default UserProfile;
