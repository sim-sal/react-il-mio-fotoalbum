import { useState } from "react";
import AppHome from "./pages/AppHome";
import AppHeader from "./components/AppHeader";
import AppLogin from "./pages/AppLogin";
import AppDashboard from "./pages/AppDashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./middleware/AppPrivateRoutes";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppHeader />
        <Routes>
          <Route>
            <Route path="/" element={<AppHome />} />
            <Route path="/login" element={<AppLogin />} />
            {/* Rotte private */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <AppDashboard />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;