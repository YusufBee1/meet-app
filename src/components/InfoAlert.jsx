import React from 'react';

const InfoAlert = ({ text }) => {
  return (
    <div className="alert info-alert" style={{ color: '#1e90ff' }}>
      {text}
    </div>
  );
};

export default InfoAlert;
