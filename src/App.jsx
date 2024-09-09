// AppContent.jsx
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadSettings, toggleDarkMode, changeBackgroundColor, resetColors, clearLocalStorage, hideColumn3, toggleSettings, toggleColumnTwo } from './settingsSlice';
import './App.css';
import TitleRow from './components/TitleRow';
import Column from './components/Column';
import NavigationColumn from './components/NavigationColumn';
import ColumnTwoButton from './components/ColumnTwoButton';
import ColumnThree from './components/ColumnThree';
import { useScreenSize } from './useScreenSize';
import navItems from './components/data';

const AppContent = () => {
  const dispatch = useDispatch();
  const { backgroundColor, showColumn3, showSettings, isColumnTwoVisible } = useSelector((state) => state.settings);
  const isSmallScreen = useScreenSize();
  const colorPickerRef = useRef(null);

  useEffect(() => {
    dispatch(loadSettings());
  }, [dispatch]);

  return (
    <div className="app">
      <div className="landing-page">
        <TitleRow hideColumn3={() => dispatch(hideColumn3())} />
        <div className={`columns ${showColumn3 ? 'show-column3' : ''}`}>
          {isSmallScreen ? (
            <>
              <ColumnTwoButton toggleColumnTwo={() => dispatch(toggleColumnTwo())} />
              {isColumnTwoVisible && (
                <NavigationColumn items={navItems} toggleSettings={() => dispatch(toggleSettings())} />
              )}
            </>
          ) : (
            <NavigationColumn items={navItems} toggleSettings={() => dispatch(toggleSettings())} />
          )}
          <Column>Column 2</Column>
          <ColumnThree
            hideColumn3={() => dispatch(hideColumn3())}
            showSettings={showSettings}
            settingsProps={{
              toggleDarkMode: () => dispatch(toggleDarkMode()),
              toggleColumn3: () => dispatch(toggleSettings()),
              changeBackgroundColor: () => colorPickerRef.current.click(),
              resetColors: () => dispatch(resetColors()),
              clearLocalStorage: () => dispatch(clearLocalStorage()),
              colorPickerRef,
              backgroundColor,
              handleColorChange: (e) => dispatch(changeBackgroundColor(e.target.value)),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AppContent;