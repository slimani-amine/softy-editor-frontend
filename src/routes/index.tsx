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
import PreviewDocument from '@/pages/Documents/Preview/PreviewDocument';

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
        path="/workspaces/:workspaceId/documents"
        element={
          <PrivateRoute>
            <Documents />
          </PrivateRoute>
        }
      >
        <Route index element={<DocumentsEmptyPage />} />
        <Route
          path="/workspaces/:workspaceId/documents/:documentId"
          element={<DocumentIdPage />}
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
    </Routes>
  </BrowserRouter>
);

export default Router;
