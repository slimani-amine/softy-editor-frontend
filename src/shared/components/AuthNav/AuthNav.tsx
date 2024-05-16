import React from 'react';
import { Link } from 'react-router-dom';
import AuthLogo from '../Shared/Icons/AuthLogo';

const AuthNav: React.FC = () => (
  <div
    className={
      ' dark:bg-transparent fixed top-0 flex items-center w-full px-6'
    }
  >
    <Link to="/">
      <AuthLogo />
    </Link>
  </div>
);

export default AuthNav;
