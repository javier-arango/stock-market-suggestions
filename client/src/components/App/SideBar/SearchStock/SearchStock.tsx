import React, { useState } from "react";

function SideBar(props: any) {
  const handleChange = (event: any) => {
    const value = event.target.value;
    props.searchStock(value);
  };

  return (
    <div className="form-floating m-3">
      <input type="text" className="form-control" onChange={handleChange} />
      <label htmlFor="floatingInput">Search for a stock</label>
    </div>
  );
}

export default SideBar;
