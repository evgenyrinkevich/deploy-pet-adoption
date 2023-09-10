import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
} from '@mui/material';

const SearchComponent = ({
  type,
  adoptionStatus,
  name,
  minHeight,
  maxHeight,
  minWeight,
  maxWeight,
  setType,
  setAdoptionStatus,
  setName,
  setMinHeight,
  setMaxHeight,
  setMinWeight,
  setMaxWeight,
}) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      my={4}
      gap={2}
    >
      <FormControl variant='standard' sx={{ m: 1, minWidth: 500, mt: 2 }}>
        <InputLabel>Animal Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value='Dog'>Dog</MenuItem>
          <MenuItem value='Cat'>Cat</MenuItem>
          <MenuItem value='Other'>Other</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant='standard' sx={{ m: 1, minWidth: 500 }}>
        <InputLabel>Adoption Status</InputLabel>
        <Select
          value={adoptionStatus}
          onChange={(e) => setAdoptionStatus(e.target.value)}
        >
          <MenuItem value='Available'>Available</MenuItem>
          <MenuItem value='Adopted'>Adopted</MenuItem>
          <MenuItem value='Fostered'>Fostered</MenuItem>
        </Select>
      </FormControl>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: 500,
          gap: 1,
        }}
      >
        <TextField
          variant='standard'
          label='Min Height (cm)'
          value={minHeight}
          onChange={(e) => setMinHeight(e.target.value)}
        />
        <TextField
          variant='standard'
          label='Max Height (cm)'
          value={maxHeight}
          onChange={(e) => setMaxHeight(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: 500,
          gap: 1,
        }}
      >
        <TextField
          variant='standard'
          label='Min Weight (kg)'
          value={minWeight}
          onChange={(e) => setMinWeight(e.target.value)}
        />
        <TextField
          variant='standard'
          label='Max Weight (kg)'
          value={maxWeight}
          onChange={(e) => setMaxWeight(e.target.value)}
        />
      </Box>
      <TextField
        sx={{ m: 1, minWidth: 500 }}
        label='Pet Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Box>
  );
};

export default SearchComponent;
