import React, { useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./components/LoginPage";
import ManageLoans from "./components/ManageLoans";
import { SnackbarProvider } from "./components/SnackbarProvider";
import { BackdropProvider } from "./components/BackdropProvider";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authenticated");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <SnackbarProvider>
      <BackdropProvider>
        <Router>
          <Routes>
            {/* Login Page Route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <MainLayout />
                </PrivateRoute>
              }
            >
              <Route
                path="home"
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="manage-loans"
                element={
                  <PrivateRoute>
                    <ManageLoans />
                  </PrivateRoute>
                }
              />
              {/* Add more routes as needed */}
            </Route>
          </Routes>
        </Router>
      </BackdropProvider>
    </SnackbarProvider>
  );
}

export default App;
