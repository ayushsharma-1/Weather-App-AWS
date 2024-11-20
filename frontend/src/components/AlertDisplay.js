// import React from 'react';

// const AlertDisplay = ({ alerts }) => (
//   <div>
//     {alerts.length > 0 && (
//       <div className="alert">
//         {alerts.map((alert, index) => (
//           <p key={index}>{alert}</p>
//         ))}
//       </div>
//     )}
//   </div>
// );

// export default AlertDisplay;



import React from 'react';

const AlertDisplay = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="alert-display" role="alert">
      <p className="alert-title">Weather Alerts:</p>
      <ul className="alert-list">
        {alerts.map((alert, index) => (
          <li key={index}>{alert}</li>
        ))}
      </ul>
    </div>
  );
};

export default AlertDisplay;