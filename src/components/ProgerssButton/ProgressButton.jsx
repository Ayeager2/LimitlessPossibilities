// ProgressButton.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementProgress, resetProgress } from './progressSlice'; // Assume you have a progress slice
import './ProgressButton.css'; // Import the CSS file

const ProgressButton = () => {
  const dispatch = useDispatch();
  const progress = useSelector((state) => state.progress.value);

  const handleButtonClick = () => {
    dispatch(incrementProgress());
  };

  const handleResetClick = () => {
    dispatch(resetProgress());
  };

  return (
    <div className="progress-button">
      <button onClick={handleButtonClick}>Increment Progress</button>
      <button onClick={handleResetClick}>Reset Progress</button>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressButton;