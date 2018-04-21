import React from "react";
import ReactLoading from "react-loading";

const Loader = () => {
  return (
    <div className="loader-base">
      <ReactLoading
        type="spinningBubbles"
        color="#f0eeee"
        height={200}
        width={200}
      />
      <div className="loader-text">Loading...</div>
    </div>
  );
};

export default Loader;
