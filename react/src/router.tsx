import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import UsersList from "./views/Users/UsersList";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import UserForm from "./views/Users/UserForm";
import Posts from "./views/Posts/Posts";
import PostForm from "./views/Posts/PostForm";
import UserView from "./views/Users/UserView";

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
              element: <UsersList/>
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
              path: '/users/view/:id',
              element: <UserView />
          },
          {
              path: '/posts',
              element: <Posts/>
          },
          {
              path: '/posts/new',
              element: <PostForm/>
          },
          {
              path: '/posts/:id',
              element: <PostForm/>
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
