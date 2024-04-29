import { Fragment } from 'react'

interface MainLayoutProps {
  children: React.ReactNode
}

const GuestLayout = ({ children }: MainLayoutProps) => {
  return <Fragment>{children}</Fragment>
}

export default GuestLayout
