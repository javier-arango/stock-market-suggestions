import React from "react";

function SideBar(props: any) {
  return (
    <div className="w-100 h-20 d-flex flex-column my-5 justify-content-center align-items-center">
      <p className="d-flex align-items-center">Sort Algorithm</p>
      <div className="d-flex">
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
    </div>
  );
}

export default SideBar;
