import React, {Fragment, useState} from 'react'
import './request-items.css'

export const RequestItems = () => {
  const [searchValue, setSearchValue] = useState('')

  const handleChange = value => {
    setSearchValue(value)
  }

  const handleEnter = e => {
    if (e.key === 'Enter') {
      // TODO: add ajax call here when the user searches for an item
    }
  }

  const handleAddItem = e => {
    e.preventDefault()
    // add to the subscriber's cart
  }

  const neighbors = [
    {name: 'Angelina', rating: 4},
    {name: 'Timothy', rating: 3.5},
    {name: 'Ashley', rating: 4.5}
  ]

  return (
    <Fragment>
      <div>Request Items</div>
      <div className="main-container">
        <div className="container">
          <div className="search-bar">
            <i className="fa fa-search" />
            <input
              name="search-bar"
              type="text"
              className="search-bar-text"
              onChange={e => handleChange(e.target.value)}
              value={searchValue}
              placeholder="Search for an item"
              onKeyDown={e => handleEnter(e)}
            />
          </div>{' '}
          <p />
          <h2>Neighbors in your area</h2>
          {neighbors.map((neighbor, idx) => (
            <div className="buyer-card" key={idx}>
              <div className="buyer-card-left">
                {/* TODO: Pass in props here */}
                <div style={{letterSpacing: '.15em'}}>
                  {neighbor.name.toUpperCase()}
                </div>
                <div style={{fontSize: '12px'}}>Rating: {neighbor.rating}</div>
              </div>
              <button
                type="button"
                className="buyer-card-button"
                onClick={e => handleAddItem(e)}
              >
                +
              </button>
            </div>
          ))}
        </div>

        <div className="container" />
      </div>
    </Fragment>
  )
}
