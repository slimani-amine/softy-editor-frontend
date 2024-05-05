import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Documents from '../pages/Documents';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import OnboardingRoute from './OnboardingRoute';
import DocumentsEmptyPage from '@/pages/Documents/_components/DocumentsEmptyPage';
import DocumentIdPage from '@/pages/Documents/_components/DocumentIdPage';
import PageNotFound from 'shared/components/PageNotFound';
import PreviewDocument from '@/pages/Preview/PreviewDocument';
import ForgotPassword from '@/pages/Authentication/ForgotPassword';
import NotFound from 'shared/features/NotFound/NotFound';
import Home from '@/pages/LandingPage/Home';
import Login from '@/pages/Authentication/Login';
import ResetPassword from '@/pages/Authentication/ResetPassword';
import Pricing from '@/pages/Pricing';
import Onboarding from '@/pages/Onboarding';
import Success from '@/pages/payment/success';
import Canceled from '@/pages/payment/Canceled';
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
          <PrivateRoute>
            <Pricing />
          </PrivateRoute>
        }
      />
      <Route
        path="/success"
        element={
          <PrivateRoute>
            <Success />
          </PrivateRoute>
        }
      />
      <Route
        path="/canceled"
        element={
          <PrivateRoute>
            <Canceled />
          </PrivateRoute>
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
      <Route path="/preview/:documentId" element={<PreviewDocument />} />
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
