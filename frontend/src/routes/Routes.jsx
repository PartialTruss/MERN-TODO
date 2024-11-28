import { Navigate, Route, Routes } from "react-router-dom";
import ResponsiveDrawer from "../pages/Dash";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import QuotesPage from "../pages/QuotesPage";
import SettingsPage from "../pages/SettingsPage";
import SignupPage from "../pages/SignupPage";
import StatisticPage from "../pages/StatisticsPage";
import ProtectedRoute from "./ProtectedRoute";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        element={
          <ProtectedRoute>
            <ResponsiveDrawer />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<HomePage />} />
        <Route path="/quotes" element={<QuotesPage />} />
        <Route path="/statistics" element={<StatisticPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};

export default RoutesConfig;
