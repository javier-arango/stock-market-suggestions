import React from "react";

function SideBar(props: any) {
  return (
    <div className="form-floating m-3">
      <input type="text" className="form-control" placeholder="Apple" />
      <label htmlFor="floatingInput">Search for a stock</label>
    </div>
  );
}

export default SideBar;
