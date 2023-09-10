import { Container, Grid } from '@mui/material';
import PetCard from './PetCard';
import { useLocation } from 'react-router-dom';

const PetList = ({ pets }) => {
  const location = useLocation();

  return (
    <Container>
      <Grid container spacing={2}>
        {pets.map((pet) => (
          <Grid item xs={12} sm={6} md={4} key={pet.id}>
            <PetCard pet={pet} isAdmin={location.pathname === '/admin'} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PetList;
