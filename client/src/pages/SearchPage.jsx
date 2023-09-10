import { Box } from '@mui/material';
import SearchComponent from '../components/SearchComponent';
import PetList from '../components/PetList';
import { useGetPetsQuery } from '../api/apiSlice';
import { useState } from 'react';

const SearchPage = () => {
  const [type, setType] = useState('');
  const [adoptionStatus, setAdoptionStatus] = useState('');
  const [name, setName] = useState('');
  const [minHeight, setMinHeight] = useState('');
  const [maxHeight, setMaxHeight] = useState('');
  const [minWeight, setMinWeight] = useState('');
  const [maxWeight, setMaxWeight] = useState('');

  const { data, isLoading } = useGetPetsQuery({
    type,
    adoptionStatus,
    name,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
  });

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <Box>
      <SearchComponent
        type={type}
        setType={setType}
        adoptionStatus={adoptionStatus}
        setAdoptionStatus={setAdoptionStatus}
        name={name}
        setName={setName}
        minHeight={minHeight}
        setMinHeight={setMinHeight}
        maxHeight={maxHeight}
        setMaxHeight={setMaxHeight}
        minWeight={minWeight}
        setMinWeight={setMinWeight}
        maxWeight={maxWeight}
        setMaxWeight={setMaxWeight}
      />
      <PetList pets={data ? data.pets : []} />
    </Box>
  );
};

export default SearchPage;
