import React from 'react';
import { Link } from 'react-router-dom';

const AuthNav: React.FC = () => (
  <div
    className={
      'bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6'
    }
  >
    <Link to="/" className="flex items-center w-full">
      <span className="font-semibold text-gray-700 text-lg">Softy-Editor</span>
    </Link>
  </div>
);

export default AuthNav;
