import { useEffect, useState } from "react";
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from "web3";
import "./App.css";
import { loadContract } from "./utils/load-contract";

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null
  })
  
  const [account, setAccount] = useState(null)

  // connect to ethereum
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider()
      const contract  = await loadContract("Faucet", provider)

      if (provider) {
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract
        })

      } else {
        console.error('Please install metamask')
      }

    }
    loadProvider()
  }, [])

  // get accounts
  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts()
      setAccount(accounts[0])
    }
    web3Api.web3 && getAccount()
  }, [web3Api.web3])


  return (
    <>
     <div className="faucet-wrapper">
      <div className="faucet">
        <div className="is-flex is-align-items-center">
          <span>
            <strong className="mr-2">Account: </strong>
          </span>
          <div>
            { account ? <div>{account}</div> :
             <button className="button is-small is-link is-warning"
             onClick={() => 
              web3Api.provider.request({method: "eth_requestAccounts"})}>
                Enable
              </button> 
            }
          </div>
          </div>
        <div className="balance-view is-size-2 my-4">
          Current Balance: <strong>10</strong> ETH
        </div>
        <button className="button is-link mr-2">Donate</button>
        <button className="button is-primary">Withdraw</button>
      </div>
     </div>
    </>
  );
}

export default App