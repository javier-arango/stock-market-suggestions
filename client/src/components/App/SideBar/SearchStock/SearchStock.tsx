import React, { ChangeEventHandler } from "react";

function SideBar({ searchStock }: any) {
    /**
     * Updates the search stock
     * 
     * @param event input event
     */
    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        searchStock(value);
    };

    return (
        <div className="form-floating m-3">
            <input
                type="text"
                className="form-control"
                onChange={handleChange}
            />
            <label htmlFor="floatingInput">Search for a stock</label>
        </div>
    );
}

export default SideBar;
