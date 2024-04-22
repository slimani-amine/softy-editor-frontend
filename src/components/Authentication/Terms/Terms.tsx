import React from 'react';


const Terms: React.FC = () => (
  <div className="w-full mb-0 text-xs text-[#ACABA9] text-center mt-16">
    <p className="mb-0">
      By continuing, you acknowledge that you understand and agree to the{' '}
      <a
        href="https://www.notion.so/Personal-Use-Terms-of-Service-00e4e5d0f2b9411cbee6493f15779500"
        rel="noopener noreferrer"
        className="inline text-gray-300 hover:text-blue-500 no-underline cursor-pointer"
      >
        Terms & Conditions
      </a>{' '}
      and{' '}
      <a
        href="https://www.notion.so/3468d120cf614d4c9014c09f6adc9091"
        rel="noopener noreferrer"
        className="inline text-gray-300 hover:text-blue-500 no-underline cursor-pointer"
      >
        Privacy Policy
      </a>
    </p>
  </div>
);

export default Terms;
