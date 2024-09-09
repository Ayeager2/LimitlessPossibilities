import Settings from './Settings';
import { useSelector } from 'react-redux';
const ColumnThree = () => {
  const {showSettings} = useSelector((state) => state.settings);

  return (
    <div className="column3">      
      {showSettings && <Settings/>}
    </div>
  );
};

export default ColumnThree;