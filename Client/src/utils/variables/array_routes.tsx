import { RouteObject } from "react-router-dom";

import Register from "../../pages/Account/Register/Register";
import Login from "../../pages/Account/Login/Login";

import ProtectedRoute from "../ProtectedRoute";
import Home from "../../pages/Home/Home";
import AddUser from "../../pages/AddUser/AddUser";
import EditUser from "../../pages/EditUser/EditUser";

// evitando dependencia circular ao não exportar em constants.tsx
export const routes: RouteObject[] = [
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register-admin",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/add-user",
    element: (
      <ProtectedRoute>
        <AddUser />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit-user",
    element: (
      <ProtectedRoute>
        <EditUser />
      </ProtectedRoute>
    ),
  },
];
