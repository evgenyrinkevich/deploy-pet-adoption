import { Typography, Box, List, ListItem } from '@mui/material';

const LandingPage = () => {
  return (
    <Box mt={4} mb={2}>
      <Typography variant='h4' align='center'>
        Welcome to Pet Adoption App!
      </Typography>
      <List>
        <ListItem>
          <Typography variant='subtitle1'>
            <b>Discover</b>: Browse through our extensive selection of lovable
            animals, each with their own unique personalities and stories.
            Whether you are looking for a furry friend to join your family or
            considering fostering, we have a diverse range of animals awaiting
            your affection.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant='subtitle1'>
            <b>Adopt</b>: Once you find a furry companion that melts your heart,
            our adoption process is designed to ensure a seamless and joyful
            experience. We prioritize the well-being of our animals and aim to
            match them with the perfect family, ensuring a loving and lasting
            connection.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant='subtitle1'>
            <b>Foster</b>: If you are not ready for a permanent commitment our
            fostering program allows you to provide a temporary home and care
            for an animal in need. Fostering helps prepare animals for adoption
            while giving you the rewarding experience of helping them flourish.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant='subtitle1'>
            <b>Spread the Love</b>: By adopting or fostering a pet through our
            service, you are not only gaining a loyal companion but also saving
            a life and creating space for another animal in need.
          </Typography>
        </ListItem>
      </List>
    </Box>
  );
};

export default LandingPage;
