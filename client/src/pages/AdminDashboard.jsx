import PetList from '../components/PetList';
import UsersList from '../components/UsersList';
import { Box, Typography, Button } from '@mui/material';
import { useGetPetsQuery } from '../api/apiSlice';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { data, error, isLoading } = useGetPetsQuery();

  return (
    <Box>
      <Typography variant='h4' mb={2}>
        Users List
      </Typography>
      <UsersList />
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Typography variant='h4' mt={4} mb={2}>
          Pet List
        </Typography>
        <Button
          variant='contained'
          color='primary'
          component={Link}
          to='/admin/pets/add'
        >
          Add Pet
        </Button>
      </Box>
      <PetList pets={data ? data.pets : []} />
    </Box>
  );
};

export default AdminDashboard;
