// SettingsContext.js
import { createContext, useContext } from 'react';
import { useSettings } from './useSettings';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const settings = useSettings();
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);