import { useState } from 'react';
import { useAddPetMutation } from '../api/apiSlice';
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
import { useNavigate } from 'react-router-dom';

const AddPet = () => {
  const [addPet, { isLoading: isAddingPet }] = useAddPetMutation();
  const navigate = useNavigate();

  const [petDetails, setPetDetails] = useState({
    type: '',
    name: '',
    adoptionStatus: '',
    picture: '',
    height: '',
    weight: '',
    color: '',
    bio: '',
    hypoallergenic: false,
    breed: '',
  });

  const handleInputChange = (field, value) => {
    setPetDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
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

      await addPet(formData);
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
                onChange={() =>
                  handleInputChange(
                    'hypoallergenic',
                    !petDetails.hypoallergenic
                  )
                }
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
            Add Pet
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddPet;
