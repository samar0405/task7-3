import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import Login from "../components/sign-in/signin";
import Tasks from "../components/tasks/tasks";
import Main from "../components/main/main";
import Products from "../components/products/products";
import Users from "../components/users/index";
import SignIn from "../components/sign-in/signin";
import SignUp from "../components/sign-up/signup";

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="main" element={<Main />}>
          <Route index element={<Tasks />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Index;
