import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

const PetCard = ({ pet, isAdmin }) => {
  return (
    <Card>
      <CardMedia
        component='img'
        height='140'
        image={pet.picture}
        alt={pet.name}
      />
      <CardContent>
        <Typography variant='h5' component='div'>
          {pet.name}
        </Typography>
        <Typography color='textSecondary' gutterBottom>
          {pet.adoptionStatus}
        </Typography>
        {isAdmin ? (
          <Button
            variant='outlined'
            component={Link}
            to={`/admin/pets/${pet.id}`}
          >
            Edit
          </Button>
        ) : (
          <Button variant='outlined' component={Link} to={`/my-pets/${pet.id}`}>
            See More
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PetCard;
