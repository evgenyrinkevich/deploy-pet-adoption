import prisma from '../../db.js';

const getPets = async (req, res) => {
  const {
    adoptionStatus,
    type,
    name,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
  } = req.query;

  try {
    const filter = {};

    if (adoptionStatus) {
      filter.adoptionStatus = {
        equals: adoptionStatus,
      };
    }

    if (type) {
      filter.type = {
        equals: type,
      };
    }

    if (name) {
      filter.name = {
        contains: name,
      };
    }

    if (minHeight && maxHeight) {
      filter.height = {
        gte: parseFloat(minHeight),
        lte: parseFloat(maxHeight),
      };
    } else if (minHeight) {
      filter.height = {
        gte: parseFloat(minHeight),
      };
    } else if (maxHeight) {
      filter.height = {
        lte: parseFloat(maxHeight),
      };
    }

    if (minWeight && maxWeight) {
      filter.weight = {
        gte: parseFloat(minWeight),
        lte: parseFloat(maxWeight),
      };
    } else if (minWeight) {
      filter.weight = {
        gte: parseFloat(minWeight),
      };
    } else if (maxWeight) {
      filter.weight = {
        lte: parseFloat(maxWeight),
      };
    }

    const pets = await prisma.pet.findMany({
      where: filter,
    });

    res.json({
      message: 'List of pets',
      pets,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default getPets;
