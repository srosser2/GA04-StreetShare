import React from 'react'

export default function SideDraw({ children, closeSideDrawHandler }) {
  return (
    <div className={'side-draw-container'}>
      <div>
        <button className='button is-danger' onClick={() => closeSideDrawHandler()}>Close</button>
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}
