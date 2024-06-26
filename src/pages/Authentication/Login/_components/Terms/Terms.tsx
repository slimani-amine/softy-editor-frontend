import React from 'react';

interface Props {
  className: string;
}

const Terms: React.FC<Props> = ({ className }) => (
  <p className={className}>
    By continuing, you acknowledge that you understand and agree to the{' '}
    <a
      href="https://www.notion.so/Personal-Use-Terms-of-Service-00e4e5d0f2b9411cbee6493f15779500"
      rel="noopener noreferrer"
      className="inline text-gray-400 hover:text-blue-500 no-underline cursor-pointer"
    >
      Terms & Conditions
    </a>{' '}
    and{' '}
    <a
      href="https://www.notion.so/3468d120cf614d4c9014c09f6adc9091"
      rel="noopener noreferrer"
      className="inline text-gray-400 hover:text-blue-500 no-underline cursor-pointer"
    >
      Privacy Policy
    </a>
  </p>
);

export default Terms;
