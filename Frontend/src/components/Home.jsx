import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import { useRef } from "react";
const Home = (props) => {
  const Amount = useRef();
  const Duration = useRef();
  const [Confirmed, setConfirm] = useState(false)
  const handlerLock = async () => {
    if (Confirmed && Amount.current.value && Duration.current.values) {
      try {
        await props.Signer.add_users(
          props.accountAddress,
          Amount.current.value,
          "120000",
          {
            value: ethers.utils.parseEther(Amount.current.value),
          }
        ).then(() => {
          toast.success("Successfully Locked");
        });
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong !");
      } 
    }
    else {
      toast.error("Please ! fill all the fields");
    }
  };
  return (
    <>
      <div className="container d-flex align-items-center justify-content-center flex-column my-4" style={{height:"vh"}}>
        <div className="d-flex w-100">
          <div className="card p-2 me-2 shadow p-3 mb-5 bg-body rounded w-100">
              <h4 className="card-title d-flex align-items-center m-0 p-0"> <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
</svg>&nbsp;Client </h4>
            <div className="d-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill={props.accountAddress ? "green" : "red"} class="bi bi-circle-fill " viewBox="0 0 16 16">
  <circle cx="8" cy="8" r="8"/>
              </svg>
              &nbsp;
              <h6 className={`${props.accountAddress ? "text-success" : "text-danger"} m-0 p-0`} > {props.accountAddress ? "Connected" : "Not connected"} </h6>
            </div>
            <h5
              className="text-opacity-75 py-3"
            >
              {props.accountAddress ?? "--"}
            </h5>
            <a href="#" class="card-link">
              {props.accountAddress ? "" : "Connect Metamask"}{" "}
            </a>
          </div>
          <div className="card p-2 ms-2 shadow p-3 mb-5 bg-body rounded w-100">
            <h4 className="card-title m-0 p-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-credit-card-2-front-fill" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
</svg>&nbsp;Contract</h4>
            <div className="d-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill={props.accountAddress ? "green" : "red"} class="bi bi-circle-fill " viewBox="0 0 16 16">
  <circle cx="8" cy="8" r="8"/>
</svg>
              &nbsp;
              <h6 className={`${props.ContractAddress ? "text-success" : "text-danger"} m-0 p-0 `} > {props.ContractAddress ? "Connected" : "Not connected"} </h6>
            </div>
            <h5
              className="text-opacity-75 py-3"
            >
              {props.ContractAddress ?? "--"}
            </h5>
          </div>
        </div>
        <div className="d-flex flex-column w-100">
          <input
            type="text"
            class="form-control p-2 m-1 shadow-sm p-3 mb-5 bg-body rounded"
            placeholder="Amount"
            id="amount"
            aria-label="Username"
            aria-describedby="basic-addon1"
            ref={Amount}
          />
          <select
            class="form-select shadow-sm p-3 mb-5 bg-body rounded"
            id="inputGroupSelect01"
                ref={Duration}
          >
            <option selected>Duration...</option>
            <option value="1">1 hrs</option>
            <option value="2">2 hrs</option>
            <option value="3">3 hrs</option>
          </select>
          <small className="text-light">
            {" "}
            *Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi
            praesentium, illum sapiente perspiciatis non aut nobis cum voluptate
            enim placeat distinctio quibusdam nesciunt explicabo ullam. In sed,
            optio omnis quae explicabo nemo ipsum corrupti!{" "}
          </small>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value={Confirmed}
              id="flexCheckDefault"
          onClick={() => setConfirm(!Confirmed)}
            />
            <label class="form-check-label" for="flexCheckDefault" >
              <small className="text-light">I agree with terms and policy</small>
            </label>
          </div>
          <button 
            className="btn btn-primary my-4 shadow mb-5 rounded d-flex justify-content-center align-items-center"
            onClick={() => handlerLock()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
</svg> &nbsp;
            Lock My Ethers
          </button>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Home;
