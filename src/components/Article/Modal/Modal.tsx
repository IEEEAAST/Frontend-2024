import React from "react"
import './styles/Modal.css'

type modalprops = {
  closeModal : React.Dispatch<React.SetStateAction<boolean>>
}

export const Modal = ({closeModal}:modalprops) => {
  return (
    <div className='modalContainer'>
      <div className="modalBackground">
        <div className='modal-title'>
          <h1>Something Bothered You?</h1>
          <h5>Tell us about it to solve it...</h5>
        </div>
        <div className='modal-body'>
          <textarea placeholder='Describe whats wrong here...'></textarea>
        </div>
        <div className='modal-footer'>
          <button className='modal-cancel' onClick={()=>closeModal(false)}>Cancel</button>
          <button className='modal-submit'>Submit</button>
        </div>
      </div>
    </div>
  )
}
