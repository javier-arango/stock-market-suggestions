import React, { CSSProperties } from "react";

function Toast({ timeElapsed, selAlgo }: any) {
    const message = `Using ${
        selAlgo === "quick" ? "Quick Sort" : "Radix Sort"
    } to process data took ${timeElapsed} milliseconds to retrieve`;

    return (
        <div
            className="toast m-auto mt-3 mb-0"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={toastStyle}
        >
            <div className="toast-body text-center">{message}</div>
        </div>
    );
}

const toastStyle: CSSProperties = {
    display: "block",
}

export default Toast;
