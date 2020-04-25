import React, {Fragment, useState} from 'react'
import './request-items.css'
import classnames from 'classnames'

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
          </div>
        </div>

        <div className="container" />
      </div>
    </Fragment>
  )
}
