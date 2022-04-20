import React, { CSSProperties } from "react";

function InvestmentRatingInfo({ framedRating, timeFrame, currentTime }: any) {
    /**
     * Gets window of time with properties
     *
     * @return window of time
     */
    const getWindowOfTime = (): string => {
        let windowOfTime: string;
        switch (timeFrame[currentTime]) {
            case "3M":
                windowOfTime = "3 months";
                break;
            case "6M":
                windowOfTime = "6 months";
                break;
            case "1YR":
                windowOfTime = "1 year";
                break;
            case "5YR":
                windowOfTime = "5 years";
                break;
            default:
                windowOfTime = "month";
        }

        return windowOfTime;
    };

    return (
        <div className="row w-100 mb-3 d-flex justify-content-around">
            <div className="col-10 market-info w-80 rounded pt-2 pb-2">
                {framedRating !== undefined ? (
                    <div className="border-bottom" style={infoContainerStyle}>
                        <h4>
                            Investment Rating:{" "}
                            <span
                                className={`${
                                    framedRating < 0 ? "p-red" : "p-green"
                                }`}
                            >
                                {framedRating}
                            </span>
                        </h4>
                        <p>
                            This stock has on average been{" "}
                            <strong>
                                {framedRating < 0
                                    ? "over-priced"
                                    : "under-priced"}
                            </strong>{" "}
                            for the past {getWindowOfTime()} and it seems to be
                            a{" "}
                            <strong>{framedRating < 0 ? "bad" : "good"}</strong>{" "}
                            stock to buy for the given time frame.
                        </p>
                    </div>
                ) : null}
                <p style={infoBodyStyle}>
                    We derive what we call the{" "}
                    <strong>investment rating</strong> of a stock from the
                    relationship between its intrinsic (or discounted cashflow),
                    and market value. By getting the average gap between these
                    two values and dividing it by its average price, we are able
                    to get a number representative of how good of it is as an
                    investment. The higher the rating the better.
                </p>
                <p style={infoNoteStyle}>
                    <strong>Note:</strong> This rating is a percentage, meaning
                    it can go past 100 or below 0.
                </p>
            </div>
        </div>
    );
}

const infoContainerStyle: CSSProperties = {
    color: "white",
    margin: 10,
};

const infoBodyStyle: CSSProperties = {
    color: "white",
    margin: 0,
    marginBottom: 5,
};

const infoNoteStyle: CSSProperties = {
    color: "white",
    margin: 0,
};

export default InvestmentRatingInfo;
