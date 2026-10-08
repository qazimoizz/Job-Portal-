import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    alert("Please Log In first!");
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'recruiter') {
    alert("Access Denied! Only Recruiters can post jobs.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;