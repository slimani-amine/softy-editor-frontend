import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Articles from '../pages/Articles';
import Home from '../pages/Home';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ResetPassword from '@/pages/ResetPassword';
import ForgotPassword from '@/pages/ForgotPassword';
import Pricing from '@/components/Pricing/Pricing';
import NotFound from 'shared/features/NotFound/NotFound';
import Onboarding from '@/pages/Onboarding';
import OnboardingRoute from './OnboardingRoute';
const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/pricing"
        element={
          <PublicRoute>
            <Pricing />
          </PublicRoute>
        }
      />
      <Route
        path="*"
        element={
          <PublicRoute>
            <NotFound />
          </PublicRoute>
        }
      />
      <Route
        path="/articles"
        element={
          <PrivateRoute>
            <Articles />
          </PrivateRoute>
        }
      />
      <Route
        path="/onboarding"
        element={
          <OnboardingRoute>
            <Onboarding />
          </OnboardingRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
