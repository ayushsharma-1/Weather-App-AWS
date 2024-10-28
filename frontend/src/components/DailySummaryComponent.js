import React from 'react';

const DailySummaryComponent = ({ summary }) => (
  <div className="daily-summary">
    <h3>Daily Summary</h3>
    <p>High: {summary.high}°C</p>
    <p>Low: {summary.low}°C</p>
    <p>Description: {summary.description}</p>
  </div>
);

export default DailySummaryComponent;
