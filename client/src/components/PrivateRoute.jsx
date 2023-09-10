import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/authSlice';

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectCurrentUser);

  const isLoading = user === null;

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return <>{user?.isAdmin ? children : <Navigate to='/' />}</>;
};

export default PrivateRoute;
