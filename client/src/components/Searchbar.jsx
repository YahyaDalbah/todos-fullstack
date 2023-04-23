import React, { useState } from 'react'

export default function Searchbar({setSearchValue, hideTodos, hidden}) {

  return (
    <div className="search">
        <input onChange={e => {
          setSearchValue(e.target.value)
        }} className="search-input" type="search" placeholder="search" />
        <button onClick={hideTodos}>{hidden ? 'show todos' : 'hide todos'}</button>
    </div>
  )
}
