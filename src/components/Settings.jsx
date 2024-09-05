const Settings = ({ toggleDarkMode, toggleColumn3, changeBackgroundColor, resetColors, clearLocalStorage, colorPickerRef, backgroundColor, handleColorChange,darkMode }) => {
  return (
    <div className="settings">
      <button onClick={(e) => { e.stopPropagation(); toggleDarkMode(); }} className="toggle-button">
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>      
      <button onClick={(e) => { e.stopPropagation(); changeBackgroundColor(); }} className="toggle-button">
        Change Background Color
      </button>
      <button onClick={(e) => { e.stopPropagation(); resetColors(); }} className="toggle-button">
        Reset Colors
      </button>
      <button onClick={(e) => { e.stopPropagation(); clearLocalStorage(); }} className="toggle-button">
        Clear Local Storage
      </button>
      <input
        type="color"
        ref={colorPickerRef}
        style={{ display: 'none' }}
        value={backgroundColor}
        onChange={handleColorChange}
      />
    </div>
  );
};

export default Settings;