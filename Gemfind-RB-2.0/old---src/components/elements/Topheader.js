import React from "react";

const Topheader = () => {
  return (
    <>
      {window.initData.data[0].announcement_text !== null && (
        <div className="top_header-area">
          <span>{window.initData.data[0].announcement_text}</span>
        </div>
      )}
    </>
  );
};

export default Topheader;
