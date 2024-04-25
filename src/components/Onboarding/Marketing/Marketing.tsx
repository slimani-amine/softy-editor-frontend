import React from 'react';

interface Props {
  className: string;
}

const Marketing: React.FC<Props> = ({ className }) => (
  <p className={className}>
    You may unsubscribe from receiving marketing communications at any time.
    Notion's websites and communications are subject to our{' '}
    <a
      href="https://www.notion.so/3468d120cf614d4c9014c09f6adc9091"
      rel="noopener noreferrer"
      className="inline text-gray-500 hover:text-blue-500 underline cursor-pointer"
    >
      Privacy Policy
    </a>
  </p>
);

export default Marketing;
