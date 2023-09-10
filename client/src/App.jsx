import {
  CssBaseline,
  Container,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetAuthTokenQuery } from './store/authApiSlice';
import { setCredentials } from './store/authSlice';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import MyPets from './pages/MyPets';
import PetPage from './pages/PetPage';
import AdminDashboard from './pages/AdminDashboard';
import EditPet from './components/EditPet';
import AddPet from './components/AddPet';
import UserProfile from './components/UserProfile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

const theme = createTheme({
  typography: {
    fontSize: 16,
  },
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAuthTokenQuery();

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setCredentials(data));
    }
  }, [dispatch, isLoading, data]);

  const content = (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth='lg'
        sx={{ backgroundColor: '#f7f7f7', minHeight: '100vh' }}
      >
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/profile' element={<UserProfile />} />
          <Route path='/my-pets' element={<MyPets />} />
          <Route path='/my-pets/:petId' element={<PetPage />} />
          <Route
            path='/admin'
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/pets/add'
            element={
              <PrivateRoute>
                <AddPet />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/pets/:petId'
            element={
              <PrivateRoute>
                <EditPet />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
    </ThemeProvider>
  );

  return isLoading ? <h2>Loading...</h2> : content;
}

export default App;
