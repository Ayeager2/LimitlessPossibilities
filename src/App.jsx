// AppContent.jsx
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadSettings, hideColumn3, toggleSettings, toggleColumnTwo } from './settingsSlice';
import './App.css';
import TitleRow from './components/TitleRow';
import Column from './components/Column';
import NavigationColumn from './components/Navigation';
import ColumnTwoButton from './components/Body';
import { useScreenSize } from './useScreenSize';
import navItems from './data/data';
import Settings from './components/Settings';

const AppContent = () => {
  const dispatch = useDispatch();
  const { showColumn3, showSettings, isColumnTwoVisible } = useSelector((state) => state.settings);
  const isSmallScreen = useScreenSize();

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
            <div className="column3">      
              {showSettings && <Settings/>}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AppContent;