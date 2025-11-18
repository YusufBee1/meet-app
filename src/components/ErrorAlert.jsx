import React from 'react';

const ErrorAlert = ({ text }) => {
  return (
    <div className="alert error-alert" style={{ color: '#dc3545' }}>
      {text}
    </div>
  );
};

export default ErrorAlert;
