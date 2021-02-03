import React from "react"

export const Modal = ( {onAccept, onCancel, message} ) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span onClick={onCancel} className="close">X</span>
        <p>{message}</p>
        <button onClick={onAccept}>Yes!</button>
        <button onClick={onCancel}>Cancel</button>
      </div>    
    </div>
    )
}
