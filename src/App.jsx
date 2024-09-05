import { useState, useEffect, useRef } from 'react';
import './App.css';
import TitleRow from './components/TitleRow';
import Column from './components/Column';
import NavigationColumn from './components/NavigationColumn';
import Settings from './components/Settings';
import { FaRegWindowClose } from "react-icons/fa"; 
import navItems from './components/data';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showColumn3, setShowColumn3] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [isColumnTwoVisible, setIsColumnTwoVisible] = useState(false);
  const colorPickerRef = useRef(null);

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('settings'));
    if (savedSettings) {
      setDarkMode(savedSettings.darkMode);
      setBackgroundColor(savedSettings.backgroundColor);
      document.documentElement.setAttribute('data-theme', savedSettings.darkMode ? 'dark' : 'light');
      document.documentElement.style.setProperty('--background-color', savedSettings.backgroundColor);
    }

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
    saveSettings(newDarkMode, backgroundColor);
  };

  const toggleColumn3 = () => {
    setShowColumn3(!showColumn3);
  };

  const hideColumn3 = () => {
    setShowColumn3(false);
    setShowSettings(false);
  };

  const changeBackgroundColor = () => {
    colorPickerRef.current.click();
  };

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setBackgroundColor(newColor);
    document.documentElement.style.setProperty('--background-color', newColor);
    saveSettings(darkMode, newColor);
  };

  const resetColors = () => {
    const defaultSettings = {
      darkMode: false,
      backgroundColor: '#ffffff',
    };
    setDarkMode(defaultSettings.darkMode);
    setBackgroundColor(defaultSettings.backgroundColor);
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.style.setProperty('--background-color', defaultSettings.backgroundColor);
    document.documentElement.style.setProperty('--text-color', '#000000');
    document.documentElement.style.setProperty('--border-color', '#000000');
    document.documentElement.style.setProperty('--column-background-color', '#f0f0f0');
    document.documentElement.style.setProperty('--column-border-color', '#ccc');
    localStorage.setItem('settings', JSON.stringify(defaultSettings));
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    resetColors();
  };

  const saveSettings = (darkMode, backgroundColor) => {
    const settings = {
      darkMode,
      backgroundColor,
    };
    localStorage.setItem('settings', JSON.stringify(settings));
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setShowColumn3(true);
  };

  const toggleColumnTwo = () => {
    setIsColumnTwoVisible(!isColumnTwoVisible);
  };

  return (
    <div className="app">
      <div className="landing-page">
        <TitleRow hideColumn3={hideColumn3} />
        <div className={`columns ${showColumn3 ? 'show-column3' : ''}`}>
          {isSmallScreen ? (
            <>
              <button className="menuButton" onClick={toggleColumnTwo}>Menu</button>
              {isColumnTwoVisible && (
                  <NavigationColumn items={navItems} toggleSettings={toggleSettings} />
              )}
            </>
          ) : (
            <NavigationColumn items={navItems} toggleSettings={toggleSettings} />
          )}
          <Column>Column 2</Column>
          <Column className="column3">
            <FaRegWindowClose onClick={hideColumn3} />
            {showSettings && (
              <Settings
                toggleDarkMode={toggleDarkMode}
                toggleColumn3={toggleColumn3}
                changeBackgroundColor={changeBackgroundColor}
                resetColors={resetColors}
                clearLocalStorage={clearLocalStorage}
                colorPickerRef={colorPickerRef}
                backgroundColor={backgroundColor}
                handleColorChange={handleColorChange}
              />
            )}
          </Column>
        </div>
      </div>
    </div>
  );
}

export default App;