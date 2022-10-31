import { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Account from "./components/Account";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { ethers } from "ethers";
import Time_lock from "./artifacts/contracts/Time_Lock.sol/Time_lock.json"
function App() {
  const [accountAddress, SetaccountAddress] = useState();
  const [Provider, setProvider] = useState();
  const [Signer, setSigner] = useState();
  const [ContractAddress, setContractAddress] = useState();
  const [address, setAddress] = useState();
  const [Contract, setContract] = useState();
  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    const contract = new ethers.Contract(
      contractAddress,
      Time_lock.abi,
      provider
    );
    const signer = provider.getSigner();
    const signerAccount = contract.connect(signer);
    const accountAddress = await signer.getAddress();
    console.log(accountAddress);
    setContract(contract);
    SetaccountAddress(accountAddress);
    setProvider(provider);
    setSigner(signerAccount);
    setContractAddress(contractAddress);
  };
  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <>
      <Navbar accountAddress={accountAddress} />
      <Routes>
        <Route element={<Account accountAddress={accountAddress}  Signer={Signer} Contract={Contract} />} path="/account" />
        <Route element={<Home ContractAddress={ContractAddress} accountAddress={accountAddress} Signer={Signer}  />} path="/" />
      </Routes>
    </>
  );
}

export default App;
