import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Analysis from "@/pages/dashboard/Analysis";
import App from "@/App";
import Settings from "@/pages/dashboard/Settings";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";

import Dashboard from "@/pages/dashboard/Dashboard";
import Upload from "@/pages/dashboard/Upload";
import History from "@/pages/dashboard/History";
import Chat from "@/pages/dashboard/Chat";
import ProtectedRoute from "@/routes/ProtectedRoute";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing Page */}

        <Route path="/" element={<App />} />

        {/* Authentication */}

        <Route path="/login" element={<Login />} />
<Route
  path="/history"
  element={
    <ProtectedRoute>
      <History />
    </ProtectedRoute>
  }
/>
        <Route path="/register" element={<Register />} />
        <Route
  path="/analysis"
  element={
    <ProtectedRoute>
      <Analysis />
    </ProtectedRoute>
  }
/>
<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        {/* Unknown Routes */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;