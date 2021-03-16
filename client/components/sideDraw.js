import React from 'react'

export default function SideDraw({ children, closeSideDrawHandler }) {
  return (
    <div className={'side-draw-container'}>
      <div>
        <img style={{ cursor: 'pointer' }} onClick={() => closeSideDrawHandler()} src="https://img.icons8.com/color/48/000000/close-window.png" />
        {/* <button className='button is-danger' onClick={() => closeSideDrawHandler()}>Close</button> */}
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}
