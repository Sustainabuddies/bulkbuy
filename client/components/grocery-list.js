import React from 'react'
import PropTypes from 'prop-types'
import {changeToGroceryForm} from './hooks'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const GroceryList = props => {
  // const {storeName} = props
  // const onGroceryChange = () => {
  //   console.log(
  //     `Item added! Name: ${item.name} for ${item.itemTotalQty} in ${item.itemUnit} units with  ${item.itemAvailableQty} available to subscribers`
  //   )
  //   console.log(
  //     `Items on current list! ${items}`
  //   )
  // };
  const {
    item,
    items,
    handleChange,
    handleChangeButton,
    handleSubmit
  } = changeToGroceryForm()
  console.log('Item changing: ', item, ', All items: ', items)

  let mockStoreName = 'Costco'

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
                      onClick={e => handleChangeButton(e)}
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
                  type="button"
                  name="add-item"
                  className="change-item-btn add-btn"
                  onClick={e => handleChangeButton(e)}
                >
                  +
                </button>
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
