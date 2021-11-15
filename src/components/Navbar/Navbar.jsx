import { useWeb3React } from "@web3-react/core";
import React from "react";
import {InjectedConnector} from '@web3-react/injected-connector'
import "./Navbar.css";

const Navbar = () => {

  const injected = new InjectedConnector({
    supportedChainIds :[1,3,4,5],
  })

  const {account,activate,chainId,active,connector} = useWeb3React()

  async function connect(){
    try {
      await activate(injected)
      if(window.ethereum){
        window.alert('Connected')
      }else{
        window.alert('No Web3 Wallet Found, Use web3 based Browser')
      }

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="nav-bg">
      <h1 className="logo">LEDU</h1>
      <button className="connect-wallet-btn" onClick={()=>connect()}>Connect Wallet</button>
    </div>
  );
};

export default Navbar;
