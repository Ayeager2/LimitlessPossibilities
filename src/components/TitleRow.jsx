import { useSelector

 } from "react-redux";
const TitleRow = () => {
  const hideColumn3 = useSelector(state => state.settings.hideColumn3);
  return (
    <div className="title-row" onClick={hideColumn3}>
      <span>Title Section</span>
    </div>
  );
};

export default TitleRow;