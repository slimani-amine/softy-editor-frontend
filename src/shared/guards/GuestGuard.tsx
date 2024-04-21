import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store'

interface MainLayoutProps {
  children: React.ReactNode
}

const GuestGuard = ({ children }: MainLayoutProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  return isAuthenticated ? <Navigate to="/dashboard" /> : children
}

export default GuestGuard
