import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import history from '../history'

/**
 * COMPONENT
 */
export const Trips = props => {
  // const {storeName} = props
  let mockStoreName = 'Costco'
  let mockTrips = [
    {
      id: 1,
      storeName: 'Costco',
      tripDate: new Date().toDateString(),
      active: true,
      tripItems: [
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
    },
    {
      id: 2,
      storeName: 'BJs',
      tripDate: new Date().toDateString(),
      active: false,
      tripItems: [
        {
          id: 1,
          name: 'Water Bottle',
          qtyTotal: 24,
          unit: 'single',
          qtyAvailable: 12
        },
        {
          id: 2,
          name: 'Bananas',
          qtyTotal: 2,
          unit: 'pack',
          qtyAvailable: 0
        }
      ]
    }
  ]

  const handleClick = trip => {
    // PENDING: for view purposes, redirect with handling of mock data?
    history.push('/home')
  }

  return (
    <div id="trip-container">
      <h3 id="trip-store">{mockStoreName} List</h3>
      <table>
        <tbody>
          <tr id="trip-header">
            <th>Trip Date</th>
            <th>Status</th>
            <th />
          </tr>
          {mockTrips.map(trip => (
            <tr
              className={trip.active ? 'active-trip' : 'completed-trip'}
              key={trip.id}
            >
              <td className="trip-date">{trip.tripDate}</td>
              <td className="trip-status">
                {trip.active ? 'Active' : 'Completed'}
              </td>
              <td>
                <button
                  className="view-trip-btn"
                  onClick={() => handleClick(trip)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default connect(mapState)(Trips)

/**
 * PROP TYPES
 */
Trips.propTypes = {
  // storeName: PropTypes.string,
}
