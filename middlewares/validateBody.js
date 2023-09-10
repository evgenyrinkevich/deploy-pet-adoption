const Pet = [
  'name',
  'type',
  'height',
  'weight',
  'color',
  'hypoallergenic',
  'breed',
];
const User = ['email', 'password', 'firstName', 'lastName'];

const parseAndConvertToType = (obj, key, type) => {
  if (obj[key]) {
    switch (type) {
      case 'float':
        obj[key] = parseFloat(obj[key]);
        break;
      case 'boolean':
        obj[key] = obj[key] === 'true';
        break;
    }
  }
};

const validateBody = (model) => {
  return (req, res, next) => {
    try {
      const missingFields = model.filter((field) => !(field in req.body));

      Object.entries(req.body).forEach(([key, value]) => {
        if (req.body[key] === 'null') req.body[key] = null;
      });

      if (missingFields.length > 0) {
        return res.status(400).json({
          error: `Missing required fields for ${
            model.$name
          }: ${missingFields.join(', ')}`,
        });
      }

      parseAndConvertToType(req.body, 'height', 'float');
      parseAndConvertToType(req.body, 'weight', 'float');
      parseAndConvertToType(req.body, 'hypoallergenic', 'boolean');

      next();
    } catch (error) {
      console.error('Error validating request:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
};

const validatePet = validateBody(Pet);
const validateUser = validateBody(User);

export { validatePet, validateUser };
