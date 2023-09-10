export const filterPets = (pets, filters) => {
  return pets.filter((pet) => {
    const {
      animalType,
      adoptionStatus,
      petName,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight,
    } = filters;

    return (
      (!animalType || pet.type === animalType) &&
      (!adoptionStatus || pet.adoptionStatus === adoptionStatus) &&
      (!petName || pet.name === petName) &&
      (!minHeight || pet.height >= minHeight) &&
      (!maxHeight || pet.height <= maxHeight) &&
      (!minWeight || pet.weight >= minWeight) &&
      (!maxWeight || pet.weight <= maxWeight)
    );
  });
};
