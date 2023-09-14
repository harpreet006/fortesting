import React from 'react'

const SuccessModal = ({ onClick, message, path }) => {
  return (
    <div className="modal-bg">
      <div className="modal-success">
      <img  src={path} className="size-150px p-4 mx-auto" alt="success"/>
        <h5>{message}</h5>
        <button onClick={onClick}>OK</button>
      </div>
    </div>
  )
}
export default SuccessModal