import React from 'react';

const AlertDisplay = ({ alerts }) => (
  <div>
    {alerts.length > 0 && (
      <div className="alert">
        {alerts.map((alert, index) => (
          <p key={index}>{alert}</p>
        ))}
      </div>
    )}
  </div>
);

export default AlertDisplay;
