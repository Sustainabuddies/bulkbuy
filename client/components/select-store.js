import React, {useState, useEffect} from 'react'
import axios from 'axios'

import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'
import {googleApiKey} from '../../secrets'

const SelectStore = props => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0
  })
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const {coords} = position
        setCurrentLocation({
          latitude: coords.latitude,
          longitude: coords.longitude
        })
      })
    }
  }, [])

  const handleSubmit = async evt => {
    evt.preventDefault()
    const map = new google.maps.Map()
    const service = new google.maps.places.PlacesService(map)
    service.textSearch({query: searchQuery}, (results, status) =>
      console.log(results)
    )
  }

  return (
    <div className="select-store">
      <form className="select-store__form" onSubmit={handleSubmit}>
        <label className="select-store__label">
          Search for a store:
          <input
            className="select-store__input"
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </label>
        <button className="select-store__btn" type="submit">
          Search
        </button>
      </form>

      <div id="map" />

      <div className="select-store__map">
        {currentLocation.latitude ? (
          <Map
            google={props.google}
            zoom={12}
            initialCenter={{
              lat: currentLocation.latitude,
              lng: currentLocation.longitude
            }}
          />
        ) : (
          'Please share your location to use this app!'
        )}
      </div>
    </div>
  )
}

export default GoogleApiWrapper({apiKey: googleApiKey})(SelectStore)
