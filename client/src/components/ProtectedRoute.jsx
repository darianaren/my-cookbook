import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { newMessage } from "../stateManagement/actions/messageActions";

const ProtectedRoute = () => {
  const dispatch = useDispatch(),
    state = useSelector((state) => state.users);
  const { guest, user } = state;

  if (guest || !user) {
    dispatch(newMessage("You must login to access this page.", "error"));
    return <Navigate to='/login' />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
