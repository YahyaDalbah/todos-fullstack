import React, { useState } from 'react'

type Props = {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>,
  hideTodos: () => void, 
  hidden: boolean
}

export default function Searchbar({setSearchValue, hideTodos, hidden}: Props) {

  return (
    <div className="search">
        <input onChange={e => {
          setSearchValue(e.target.value)
        }} className="search-input" type="search" placeholder="search" />
        <button onClick={hideTodos}>{hidden ? 'show todos' : 'hide todos'}</button>
    </div>
  )
}
