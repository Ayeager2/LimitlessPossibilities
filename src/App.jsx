import { useRef, useState } from 'react';
import './App.css';
import TitleRow from './components/TitleRow';
import Column from './components/Column';
import NavigationColumn from './components/NavigationColumn';
import ColumnTwoButton from './components/ColumnTwoButton';
import ColumnThree from './components/ColumnThree';
import { useScreenSize } from './useScreenSize';
import { SettingsProvider, useSettingsContext } from './SettingsContext';
import navItems from './components/data';

const AppContent = () => {
  const { darkMode, backgroundColor, toggleDarkMode, handleColorChange, resetColors, clearLocalStorage } = useSettingsContext();
  const [showColumn3, setShowColumn3] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isColumnTwoVisible, setIsColumnTwoVisible] = useState(false);
  const isSmallScreen = useScreenSize();

  const toggleColumn3 = () => {
    setShowColumn3(!showColumn3);
  };

  const hideColumn3 = () => {
    setShowColumn3(false);
    setShowSettings(false);
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
              <ColumnTwoButton toggleColumnTwo={toggleColumnTwo} />
              {isColumnTwoVisible && (
                <NavigationColumn items={navItems} toggleSettings={toggleSettings} />
              )}
            </>
          ) : (
            <NavigationColumn items={navItems} toggleSettings={toggleSettings} />
          )}
          <Column>Column 2</Column>
          <ColumnThree
            hideColumn3={hideColumn3}
            showSettings={showSettings}
            settingsProps={{
              toggleDarkMode,
              toggleColumn3,
              changeBackgroundColor: () => colorPickerRef.current.click(),
              resetColors,
              clearLocalStorage,
              colorPickerRef: useRef(null),
              backgroundColor,
              handleColorChange,
            }}
          />
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <SettingsProvider>
    <AppContent />
  </SettingsProvider>
);

export default App;