import React from "react"

export const Modal = ( {onAccept, onCancel, message} ) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close">X</span>
        <p>{message}</p>
        <button onClick={onAccept}>Da</button>
        <button onClick={onCancel}>Cancel</button>
      </div>    
    </div>
    )
}