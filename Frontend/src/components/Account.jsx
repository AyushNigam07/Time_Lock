import { ethers, utils } from 'ethers';
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import countdown from 'countdown'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Account = (props) => {
  const [User, setUser] = useState()
  const fetchUser = async () => {
    try {
      const user = await props.Contract.user_info(utils.getAddress(props.accountAddress), {
        from:props.accountAddress
      })
      setUser(user)
    } catch (error) {
      console.log(error)
  }
  }
  const withDrawal = async () => {
    try {
     await props.Signer.with_drawal(props.accountAddress)
      toast.success("Successfully withdrawal")
    } catch (error) {
      toast.error("Something went wrong !")
      console.log(error)
    }

  }
  const check = () => {
    return moment.unix(Math.floor(new Date().getTime() / 1000)).format() > moment.unix(User?._time.toString()).format()
  }
  useEffect(() => {
    fetchUser()
  }, [])  
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:"90vh"}} >
        <div class="card shadow p-2 mb-5 bg-body rounded ">
  <div class="card-body">
          <h4 class="card-title">My Account -</h4>
          <hr />
          <h5 class="card-subtitle mb-2 text-muted"> Address - { props.accountAddress}</h5>
          <h5 class="card-subtitle mb-2 text-muted"> Locked Ethers - {User?._amount.toString()  ?? "0"} ETH</h5>
          <h5 class="card-subtitle mb-2 text-muted"> Locked Until - {moment.unix(User?._time.toString()).format("hh:mm A")} ({moment.unix(User?._time.toString()).format("DD/MM/YYYY")}) </h5>
          <h5 class="card-subtitle mb-2 text-muted"> Final Deadline - {moment.unix(User?._time.toString()).format("hh:mm A")}    ({moment.unix(User?._time.toString()).format("DD/MM/YYYY")}) </h5>
          <button class={`card-link btn btn-primary mt-3 d-flex align-items-center ${Number(User?._amount.toString()) > 0 && check() ? "btn-success" : "disabled btn-danger"}`} onClick={() => withDrawal()}> {
            check() ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock-fill" viewBox="0 0 16 16">
  <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z"/>
          </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
</svg>
          }  &nbsp; Withdrawal </button>
          <ToastContainer/>
  </div>
</div>
    </div>
  )
}

export default Account