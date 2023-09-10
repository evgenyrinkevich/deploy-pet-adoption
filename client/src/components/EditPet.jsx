import { useState, useEffect } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPetByIdQuery, useUpdatePetMutation } from '../api/apiSlice';

const EditPet = () => {
  const { petId } = useParams();
  const { data, error, isLoading: isPetLoading } = useGetPetByIdQuery(petId);
  const [updatePet, { isLoading: isUpdatePetLoading }] = useUpdatePetMutation();
  const navigate = useNavigate();

  const [petDetails, setPetDetails] = useState({
    type: 'Other',
    name: '',
    adoptionStatus: 'Adopted',
    picture: '',
    height: '',
    weight: '',
    color: '',
    bio: '',
    hypoallergenic: false,
    dietery: [],
    breed: '',
    id: '',
  });

  useEffect(() => {
    if (data) {
      setPetDetails(data.pet);
    }
  }, [data]);

  const handleInputChange = (field, value) => {
    setPetDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (field) => {
    setPetDetails((prevDetails) => ({
      ...prevDetails,
      [field]: !prevDetails[field],
    }));
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    handleInputChange('picture', file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(petDetails).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await updatePet({ formData, petId });
    } catch (error) {
      console.log(error);
    }

    navigate('/admin');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Grid container spacing={2} my={4}>
        <Grid item xs={6}>
          <FormControl variant='standard' sx={{ minWidth: 500 }} fullWidth>
            <InputLabel>Pet Type</InputLabel>
            <Select
              value={petDetails.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
            >
              <MenuItem value='Dog'>Dog</MenuItem>
              <MenuItem value='Cat'>Cat</MenuItem>
              <MenuItem value='Other'>Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            variant='standard'
            type='file'
            helperText='Upload Picture'
            onChange={handleFileInputChange}
            inputProps={{
              accept: 'image/*',
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl variant='standard' sx={{ minWidth: 500 }} fullWidth>
            <InputLabel>Adoption Status</InputLabel>
            <Select
              value={petDetails.adoptionStatus}
              onChange={(e) =>
                handleInputChange('adoptionStatus', e.target.value)
              }
            >
              <MenuItem value='Available'>Available</MenuItem>
              <MenuItem value='Adopted'>Adopted</MenuItem>
              <MenuItem value='Fostered'>Fostered</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label='Pet Name'
            value={petDetails.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label='Height'
            value={petDetails.height}
            onChange={(e) => handleInputChange('height', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label='Weight'
            value={petDetails.weight}
            onChange={(e) => handleInputChange('weight', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label='Color'
            value={petDetails.color}
            onChange={(e) => handleInputChange('color', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label='Bio'
            value={petDetails.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={petDetails.hypoallergenic}
                onChange={() => handleCheckboxChange('hypoallergenic')}
              />
            }
            label='Hypoallergenic'
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label='Breed'
            value={petDetails.breed}
            onChange={(e) => handleInputChange('breed', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            sx={{ marginTop: 2 }}
          >
            Save changes
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditPet;
