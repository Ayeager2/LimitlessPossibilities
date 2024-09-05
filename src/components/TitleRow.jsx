import React from 'react';

const TitleRow = ({ hideColumn3 }) => {
  return (
    <div className="title-row" onClick={hideColumn3}>
      <span>Title Section</span>
    </div>
  );
};

export default TitleRow;