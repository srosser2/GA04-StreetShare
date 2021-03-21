import React from 'react'

export default function Search({ onSearchSubmit }) {
  return (
    <div className={'search-bar-container'}>
      {/* <div className={'postcode-search'}>
        <form>
          <input type={'text'} placeholder={'Postcode'} />
        </form>
      </div> */}
      <div className={'search-input'}>
        <form onSubmit={onSearchSubmit}>
          <input type={'text'} placeholder={'Search'} />
        </form></div>
      <div className={'search-icon'}><span className="material-icons">search</span></div>
    </div>
  )
}
