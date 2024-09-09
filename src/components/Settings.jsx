// Settings.jsx
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode, changeBackgroundColor,  clearLocalStorage } from '../settingsSlice';
import { FaRegWindowClose } from "react-icons/fa"; 

const Settings = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.settings.darkMode);
  const backgroundColor = useSelector((state) => state.settings.backgroundColor);
  const colorPickerRef = useRef(null);
  const hideColumn3 = () => dispatch({ type: 'settings/hideColumn3' });
  return (
    <div className="settings">
    <FaRegWindowClose onClick={hideColumn3} />
      <h1 className="settings-header">Settings </h1>
        
      <div></div>
      <button onClick={(e) => { e.stopPropagation(); dispatch(toggleDarkMode()); }} className="toggle-button">
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>
      <button onClick={(e) => { e.stopPropagation(); colorPickerRef.current.click(); }} className="toggle-button">
        Change Background Color
      </button>      
      <button onClick={(e) => { e.stopPropagation(); dispatch(clearLocalStorage()); }} className="toggle-button">
        Clear Local Storage
      </button>
      <input
        type="color"
        ref={colorPickerRef}
        style={{ display: 'none' }}
        value={backgroundColor}
        onChange={(e) => dispatch(changeBackgroundColor(e.target.value))}
      />
    </div>
  );
};

export default Settings;