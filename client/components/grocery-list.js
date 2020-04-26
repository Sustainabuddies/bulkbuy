import React from 'react'
import PropTypes from 'prop-types'
import changeToGroceryForm from './hooks'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const GroceryList = props => {
  // const {storeName} = props
  let mockStoreName = 'Costco'
  let mockListItems = [
    {
      id: 1,
      name: 'Toilet Paper',
      qtyTotal: 24,
      unit: 'single',
      qtyAvailable: 12
    },
    {
      id: 2,
      name: 'Oranges',
      qtyTotal: 2,
      unit: 'pack',
      qtyAvailable: 0
    },
    {
      id: 3,
      name: 'Variety Chips',
      qtyTotal: 30,
      unit: 'single',
      qtyAvailable: 20
    }
  ]

  return (
    <div id="list-container">
      <h3 id="list-store">{mockStoreName} List</h3>
      <form id="list-form" onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr id="list-header">
              <th>Item</th>
              <th>Total Quantity Buying</th>
              <th>Unit Type</th>
              <th>Up for Grabs</th>
              <th />
            </tr>
            {mockListItems.map(item => (
              <tr className="list-item saved-item" key={item.id}>
                <td className="item-name">{item.name}</td>
                <td className="item-total">{item.qtyTotal}</td>
                <td className="item-unit">{item.unit}</td>
                <td className="item-available">{item.qtyAvailable}</td>
                <td>
                  <button className="change-item-btn remove-btn">-</button>
                </td>
              </tr>
            ))}
            <tr className="list-item">
              <td>
                <input
                  name="name"
                  type="text"
                  placeholder="Item Name"
                  onChange={handleInputChange}
                  value={item.name || ''}
                  required
                />
              </td>
              <td>
                <input name="itemTotalQty" type="number" placeholder="0" />
              </td>
              <td>
                <select id="itemUnit">
                  <option value="single">single</option>
                  <option value="pack">pack</option>
                </select>
              </td>
              <td>
                <input name="itemAvailableQty" type="number" placeholder="0" />
              </td>
              <td>
                <button className="change-item-btn add-btn">+</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Submit</button>
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
