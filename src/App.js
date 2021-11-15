import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import {getBalance,stake,withdraw} from './functions'



function App() {

  const {account,activate,chainId,active,connector} = useWeb3React()

  const [networkName,SetNN] = useState(null)
  const [bal,SetBal] = useState(null)

  useEffect(()=>{
    SetNN(chainId)
    getBalance().then(x=>{
      SetBal(x)
    })
    console.log(bal)
  },[chainId,account])

  function display() {
    if(networkName){
      if(networkName==1){
        return 'ETHEREUM'
      }
      if(networkName==2){
        return 'KOVAN'
      }
      if(networkName ==3){
        return 'ROPSTEN'
      }
      if(networkName ==4){
        return 'RINKEBY'
      }
    }
  }


  return (
    <>
      <Navbar />
      <div id="home-page">
        <div className="content-holder">
          <div className="text-box">
            <div className="heads">
              <h1 className="main-head">Your LEDU Balance is :: 
                <h6>{bal}</h6>
              </h1>
            </div>
            <h4 className="text-tag">
              CONNECTED TO<span> {display()}</span> NETWORK
            </h4>
            <h5 className="your-address">YOUR ADDRESS is {account}</h5>
            <input type="text" className="input-field" />
            <h6 className="show-address">SHOW CONTRACT ADDESS</h6>
            <div className="buttons">
              <button className="btn">Stake</button>
              <button className="btn">Withdraw</button>
            </div>
          </div>
          <div className="card">
            <div className="card-container">
              <div className="staked-balance">
                <h2 className="text-desc">Your staked balance</h2>
                <h2 className="value-desc">0 LEDU</h2>
              </div>
              <div className="rewards-unstake">
                <h2 className="text-desc">Rewards if un-staked today</h2>
                <h2 className="value-desc">0 LEDU</h2>
              </div>
              <div className="rewards-maturity">
                <h2 className="text-desc">Rewards at maturity</h2>
                <h2 className="value-desc">0 LEDU</h2>
              </div>
              <div className="early-withdraws">
                <h2 className="text-desc">Early withdraw starts</h2>
                <h2 className="value-time">07/09/2021, 01:30:00</h2>
              </div>
              <div className="maturity">
                <h2 className="text-desc">Maturity</h2>
                <h2 className="value-time">07/10/2021, 01:30:00</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
