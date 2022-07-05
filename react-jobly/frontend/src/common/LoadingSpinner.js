import React from "react";
import "./LoadingSpinner.css";

/** Loading message used by components that fetch API data. */

function LoadingSpinner() {
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-auto">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
