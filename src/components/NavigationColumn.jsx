import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaCog } from 'react-icons/fa';

const NavigationColumn = ({ items, toggleSettings, darkMode }) => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [index]: !prevOpenItems[index],
    }));
  };

  return (
    <div className="column navigation-column">
      
      <ul className="nav-list">
        {items.map((item, index) => (
          <li key={index} className="nav-item-container">
            <div className="nav-item" onClick={() => toggleItem(index)}>
              {item.text}
              <span className="carrot">
                {openItems[index] ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
            {openItems[index] && item.children && (
              <div className="nested-container">
                <ul className="nested-list">
                  {item.children.map((child, childIndex) => (
                    <li key={childIndex} className="nested-item">
                      {child}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button onClick={toggleSettings} className={`settings-button ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <FaCog />
      </button>
    </div>
  );
};

export default NavigationColumn;