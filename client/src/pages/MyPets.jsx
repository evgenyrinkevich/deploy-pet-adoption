import React, { useEffect } from 'react';
import PetList from '../components/PetList';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, setCredentials } from '../store/authSlice';
import { useGetAuthTokenQuery } from '../store/authApiSlice';
import { useGetPetsByUserIdQuery } from '../store/petsApiSlice';

const MyPets = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const { data: authData, isLoading: authLoading } = useGetAuthTokenQuery();
  const {
    data: petsData,
    error: petsError,
    isLoading: petsLoading,
  } = useGetPetsByUserIdQuery(currentUser?.id);

  useEffect(() => {
    if (!authLoading && authData) {
      dispatch(setCredentials(authData));
    }
  }, [dispatch, authLoading, authData]);

  if (authLoading || petsLoading) {
    return <h1>Loading...</h1>;
  }

  if (petsError) {
    return <div>Error: {petsError.message}</div>;
  }

  return <PetList pets={petsData ? petsData.pets : []} />;
};

export default MyPets;
