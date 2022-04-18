import React, { useState } from "react";

function SideBar(props: any) {
  const [value, setValue] = useState("");

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <div className="form-floating m-3">
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={handleChange}
      />
      <label htmlFor="floatingInput">Search for a stock</label>
    </div>
  );
}

export default SideBar;
