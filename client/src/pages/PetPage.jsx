import { useParams } from 'react-router-dom';
import {
  useGetPetByIdQuery,
  useAdoptPetMutation,
  useFosterPetMutation,
  useReturnPetMutation,
  useLikePetMutation,
  useUnlikePetMutation,
} from '../api/apiSlice';
import { useGetPetsByUserIdQuery } from '../store/petsApiSlice';
import { selectCurrentUser } from '../store/authSlice';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const PetPage = () => {
  const { petId } = useParams();
  const { data, isLoading } = useGetPetByIdQuery(petId);
  const user = useSelector(selectCurrentUser);
  const { data: petsList, refetch: refetchPetsList } = useGetPetsByUserIdQuery(
    user?.id
  );
  const [petData, setPetData] = useState(data ? data.pet : {});

  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isPetLikedByUser = () => {
    return petsList?.pets.find((p) => p.id == petId) !== undefined;
  };

  const [adoptPet, { error: adoptError }] = useAdoptPetMutation();
  const [fosterPet] = useFosterPetMutation();
  const [returnPet] = useReturnPetMutation();
  const [likePet] = useLikePetMutation();
  const [unlikePet] = useUnlikePetMutation();

  useEffect(() => {
    if (!isLoading && data) {
      const isOwned = data.pet.ownerId == user.id;
      setPetData({
        ...data.pet,
        isLiked: isPetLikedByUser(),
        isOwnedByCurrentUser: isOwned,
      });
    }
  }, [data, user]);

  const handleReturn = async () => {
    await returnPet(petId);
    setPetData({
      ...petData,
      adoptionStatus: 'Available',
      isOwnedByCurrentUser: false,
    });
  };

  const handleAdopt = async () => {
    const res = await adoptPet({ petId, data: { adoptionStatus: 'Adopted' } });

    if (res.error) {
      setErrorMessage(adoptError.data.message);
      setErrorSnackbarOpen(true);
      return;
    }

    setPetData({
      ...petData,
      adoptionStatus: 'Adopted',
      isOwnedByCurrentUser: true,
      ownerId: user.id,
    });
  };

  const handleFoster = async () => {
    const res = await fosterPet({
      petId,
      data: { adoptionStatus: 'Fostered' },
    });

    if (res.error) {
      setErrorMessage(adoptError.data.message);
      setErrorSnackbarOpen(true);
      return;
    }

    setPetData({
      ...petData,
      adoptionStatus: 'Fostered',
      isOwnedByCurrentUser: true,
      ownerId: user.id,
    });
  };

  const handleSaveToggle = async () => {
    if (petData.isLiked) {
      await unlikePet(petId);
      setPetData({ ...petData, isLiked: false });
    } else {
      await likePet(petId);
      setPetData({ ...petData, isLiked: true });
    }
    refetchPetsList();
  };

  const handleCloseErrorSnackbar = () => {
    setErrorSnackbarOpen(false);
    setErrorMessage('');
  };

  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={errorSnackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseErrorSnackbar}
      >
        <Alert onClose={handleCloseErrorSnackbar} severity='error'>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Typography variant='h4'>Pet Details</Typography>
      <Card sx={{ maxWidth: 600, margin: 'auto', mt: 3 }}>
        <CardMedia
          component='img'
          alt={petData.name}
          height='300'
          image={petData.picture}
        />
        <CardContent>
          <Typography variant='h6'>Type: {petData.type}</Typography>
          <Typography variant='h6'>Name: {petData.name}</Typography>
          <Typography variant='h6'>
            Adoption Status: {petData.adoptionStatus}
          </Typography>
          <Typography variant='h6'>Height: {petData.height} inches</Typography>
          <Typography variant='h6'>Weight: {petData.weight} lbs</Typography>
          <Typography variant='h6'>Color: {petData.color}</Typography>
          <Typography variant='h6'>Bio: {petData.bio}</Typography>
          <Typography variant='h6'>
            Hypoallergenic: {petData.hypoallergenic ? 'Yes' : 'No'}
          </Typography>
          <Typography variant='h6'>
            Dietary: {petData.dietary && petData.dietary.length}
          </Typography>
          <Typography variant='h6'>Breed: {petData.breed}</Typography>
        </CardContent>
        <Grid container justifyContent='space-between' p={2}>
          {petData.isOwnedByCurrentUser ? (
            <>
              <Button
                variant='contained'
                sx={{ width: '33%' }}
                onClick={handleReturn}
              >
                Return Pet
              </Button>
              <Button
                variant='contained'
                sx={{ width: '33%' }}
                onClick={
                  petData.adoptionStatus === 'Fostered'
                    ? handleAdopt
                    : handleFoster
                }
              >
                {petData.adoptionStatus === 'Fostered' ? 'Adopt' : 'Foster'}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant='contained'
                disabled={!petData.isOwnedByCurrentUser}
                sx={{ width: '33%' }}
                onClick={
                  petData.adoptionStatus === 'Fostered'
                    ? handleAdopt
                    : handleFoster
                }
              >
                {petData.adoptionStatus === 'Fostered' ? 'Adopt' : 'Foster'}
              </Button>
              <Button
                variant='contained'
                disabled={!petData.isOwnedByCurrentUser}
                sx={{ width: '33%' }}
                onClick={
                  petData.adoptionStatus !== 'Fostered'
                    ? handleAdopt
                    : handleFoster
                }
              >
                {petData.adoptionStatus !== 'Fostered' ? 'Adopt' : 'Foster'}
              </Button>
            </>
          )}
          <Button
            variant='outlined'
            sx={{ width: '33%', height: '50px' }}
            onClick={handleSaveToggle}
            startIcon={<FavoriteBorderIcon />}
          >
            {petData.isLiked ? 'Unsave' : 'Save for Later'}
          </Button>
        </Grid>
      </Card>
    </>
  );
};

export default PetPage;
