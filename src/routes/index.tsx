import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Documents from '../pages/Documents';
import Home from '../pages/Home';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Login from '@/pages/Login';
import DocumentsPage from '@/pages/Documents/_components/DocumentsEmptyPage';
import DocumentsEmptyPage from '@/pages/Documents/_components/DocumentsEmptyPage';
import DocumentIdPage from '@/pages/Documents/_components/DocumentIdPage';
import PageNotFound from '@/components/PageNotFound';
import PreviewDocument from '@/pages/Preview/PreviewDocument';

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
      <Route path="/" element={<Home />} />
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
        path="/workspaces/:workspaceId/documents"
        element={
          <PrivateRoute>
            <Documents />
          </PrivateRoute>
        }
      >
        <Route
          index
          element={
            <PrivateRoute>
              <DocumentsEmptyPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/workspaces/:workspaceId/documents/:documentId"
          element={
            <PrivateRoute>
              <DocumentIdPage />
            </PrivateRoute>
          }
        />
      </Route>
      <Route
        path="/preview/:documentId"
        element={
          <PublicRoute>
            <PreviewDocument />
          </PublicRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
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
