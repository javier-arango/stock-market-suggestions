import React from 'react';
import StockMarketInfo from '../StockMarketInfo/StockMarketInfo';
import StockData from '../StockData/StockData';
import './stockview.css';

function StockView(props: any) {

    return (
        <div id="stock-view" className="col d-flex flex-column align-items-center justify-content-center">
        <StockMarketInfo marketInfo={props.marketInfo}/>
        <StockData data={props.stock} />
        </div>
    );
}

export default StockView;
