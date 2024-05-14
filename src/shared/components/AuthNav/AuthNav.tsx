import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Shared/Icons/Logo';

const AuthNav: React.FC = () => (
  <div
    className={
      ' dark:bg-transparent fixed top-0 flex items-center w-full px-6'
    }
  >
    <Link to="/">
      <Logo />
    </Link>
  </div>
);

export default AuthNav;
