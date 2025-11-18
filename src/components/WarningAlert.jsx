import React from 'react';

const WarningAlert = ({ text }) => {
  return (
    <div className="alert warning-alert" style={{ color: '#ffc107' }}>
      {text}
    </div>
  );
};

export default WarningAlert;
