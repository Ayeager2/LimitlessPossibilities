import React from 'react';
import { FaRegWindowClose } from "react-icons/fa"; 
import Settings from './Settings';

const ColumnThree = ({ hideColumn3, showSettings, settingsProps }) => (
  <div className="column3">
    <FaRegWindowClose onClick={hideColumn3} />
    {showSettings && <Settings {...settingsProps} />}
  </div>
);

export default ColumnThree;