import React from 'react'
import PropTypes from 'prop-types'
import {changeToGroceryForm} from './hooks'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const GroceryList = props => {
  // const {storeName} = props
  const {
    item,
    items,
    handleChange,
    handleRemoveButton,
    handleAddButton,
    handleSubmit
  } = changeToGroceryForm()

  let mockStoreName = 'Costco'

  return (
    <div id="list-container">
      <h3 id="list-store">{mockStoreName} List</h3>
      <form id="list-item-form" onSubmit={handleAddButton}>
        <table>
          <tbody>
            <tr id="list-header">
              <th>Item</th>
              <th>Total Quantity Buying</th>
              <th>Unit Type</th>
              <th>Up for Grabs</th>
              <th />
            </tr>
            {items &&
              items.map((listItem, idx) => (
                <tr className="list-item saved-item" key={idx}>
                  <td>{listItem.name}</td>
                  <td>{listItem.qtyTotal}</td>
                  <td>{listItem.unitType}</td>
                  <td>{listItem.qtyAvailable}</td>
                  <td>
                    <button
                      type="button"
                      name="remove-item"
                      index={idx}
                      className="change-item-btn remove-btn"
                      onClick={e => handleRemoveButton(e)}
                    >
                      -
                    </button>
                  </td>
                </tr>
              ))}
            <tr className="list-item">
              <td>
                <input
                  name="name"
                  type="text"
                  placeholder="Item Name"
                  onChange={handleChange}
                  value={item.name || ''}
                  required
                />
              </td>
              <td>
                <input
                  name="qtyTotal"
                  type="number"
                  onChange={handleChange}
                  value={item.qtyTotal || ''}
                  required
                />
              </td>
              <td>
                <select
                  name="unitType"
                  onChange={handleChange}
                  value={item.unitType || 'single'}
                  required
                >
                  <option value="single">single</option>
                  <option value="pack">pack</option>
                </select>
              </td>
              <td>
                <input
                  name="qtyAvailable"
                  type="number"
                  onChange={handleChange}
                  value={item.qtyAvailable || ''}
                  required
                />
              </td>
              <td>
                <button
                  type="submit"
                  name="add-item"
                  className="change-item-btn add-btn"
                >
                  +
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <form id="list-form">
        <button id="submit-list-btn" type="submit" onSubmit={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // storeName: state.trip.storeName,
  }
}

export default connect(mapState)(GroceryList)

/**
 * PROP TYPES
 */
GroceryList.propTypes = {
  // storeName: PropTypes.string,
}
