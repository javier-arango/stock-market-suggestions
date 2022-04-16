import React from 'react';
import './app.css';
import SideBar from '../SideBar/SideBar';
import StockView from '../StockView/StockView';

function App() {

  return (
    <div id="container" className="container-fluid vh-100">
      <div className="row vh-100">
        <SideBar />
        <StockView />
      </div>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
