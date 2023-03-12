import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Users from "./views/Users/Users";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import UserForm from "./views/Users/UserForm";

const router = createBrowserRouter([

    {
      path: '/',
      element: <DefaultLayout/>,
      children: [
          {
              path: '/',
              element: <Navigate to={'/users'}/>
          },
          {
              path: '/users',
              element: <Users/>
          },
          {
              path: '/users/new',
              element: <UserForm key="userCreate"/>
          },
          {
              path: '/users/:id',
              element: <UserForm key="userUpdate"/>
          },
          {
              path: '/dashboard',
              element: <Dashboard/>
          },
      ]
    },
    {
      path: '/',
      element: <GuestLayout/>,
      children:[
          {
              path: '/login',
              element: <Login/>
          },
          {
              path: '/signup',
              element: <SignUp/>
          },
      ]
    },
    {
        path: '*',
        element: <NotFound/>
    },

]);

export default router;
