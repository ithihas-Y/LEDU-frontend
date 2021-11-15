import abi from './abis/SmartChefInitializable.json'
import bep20 from './abis/IBEP20.json'
import Web3 from 'web3'


const provider = new Web3.providers.HttpProvider(process.env.REACT_APP_RPC)

const web3 = new Web3(provider)


const smartCHef = new web3.eth.Contract(
  abi.abi,
  '0x5EB333f591546a064a033d1Ff0333b94e35F7549'
)

const ethereum = window.ethereum


export async function stake(amt) {
    try {
        if (typeof ethereum !== "undefined" && ethereum !== "") {
          const tx = smartCHef.methods.deposit(amt).encodeABI()
          const transactionParameters = {
            to: '0x5EB333f591546a064a033d1Ff0333b94e35F7549',
            from: ethereum.selectedAddress,
            data: tx,
          }
          await ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
          })
        } else {
          console.log("Please install MetaMask!")
        }
      } catch (e) {
        console.log(e.message)
      }
}
export async function withdraw(amt) {
  try {
      if (typeof ethereum !== "undefined" && ethereum !== "") {
        const tx = smartCHef.methods.withdraw(amt).encodeABI()
        const transactionParameters = {
          to: '0x5EB333f591546a064a033d1Ff0333b94e35F7549',
          from: ethereum.selectedAddress,
          data: tx,
        }
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        })
      } else {
        console.log("Please install MetaMask!")
      }
    } catch (e) {
      console.log(e.message)
    }
}

export async function getBalance(){
  const ledu = new web3.eth.Contract(bep20.abi,'0x73e7040B225bF6bB72F511e954e845CF4c218685')
  if (typeof ethereum !== "undefined" && ethereum !== ""){
    if (ethereum.selectedAddress != null) {
      const balance = await ledu.methods.balanceOf(ethereum.selectedAddress).call()
      return (balance/10**18) 
    }
  }else{
    return "Wallet not Connected"
  }
  
}