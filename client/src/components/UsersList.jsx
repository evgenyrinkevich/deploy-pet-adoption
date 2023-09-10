import { useState } from 'react';
import { useGetUsersQuery } from '../store/usersApiSlice';
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Box,
} from '@mui/material';

const UsersList = () => {
  const { data, error, isLoading } = useGetUsersQuery();

  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = async (user) => {
    setSelectedUser(user);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Box display='flex' alignItems='stretch' gap={2}>
      <Paper elevation={3} sx={{ flex: 1 }}>
        <List>
          {data
            ? data.users.map((user) => (
                <ListItem
                  key={user.id}
                  button
                  onClick={() => handleUserClick(user)}
                  selected={selectedUser?.id === user.id}
                >
                  <ListItemText
                    primary={`${user.firstName} ${user.lastName}`}
                  />
                </ListItem>
              ))
            : null}
        </List>
      </Paper>
      <Paper elevation={3} sx={{ flex: 2, padding: 2 }}>
        {selectedUser ? (
          <div>
            <Typography>Phone: {selectedUser.phoneNumber}</Typography>
            <Typography>Email: {selectedUser.email}</Typography>
            <Typography variant='h6' my={1}>
              Owned Pets
            </Typography>
            {selectedUser.Pet && selectedUser.Pet.length > 0 ? (
              <ul>
                {selectedUser.Pet.map((pet) => (
                  <li key={pet.id}>{pet.name}</li>
                ))}
              </ul>
            ) : (
              <Typography>No owned pets</Typography>
            )}
          </div>
        ) : (
          <Typography>Select a user to view details</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default UsersList;
