import React from "react";

function SideBar(props: any) {
  return (
    <div className="w-100 h-20 d-flex ms-3 my-5">
      <p className="d-flex align-items-center">Sort Algorithm:</p>
      {props.algorithms.map((algorithm: string) => {
        return (
          <div key={algorithm}>
            <input
              type="radio"
              className="btn-check"
              name="options-outlined"
              id={algorithm}
              autoComplete="off"
              checked={props.selAlgo == algorithm ? true : false}
              onChange={() => props.changeAlgorithm(algorithm)}
            />
            <label
              className="btn btn-outline-secondary ms-3"
              htmlFor={algorithm}
            >
              {algorithm}
            </label>
          </div>
        );
      })}
    </div>
  );
}

export default SideBar;
