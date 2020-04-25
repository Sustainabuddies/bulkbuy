import React, {useState, useEffect} from 'react'
import axios from 'axios'

import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'
import InfoWindowEx from './info-window'
import {googleApiKey} from '../../secrets'

const SelectStore = props => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [markers, setMarkers] = useState([])
  const [infoWindow, setInfoWindow] = useState({
    activeMarker: null,
    isVisible: false,
    data: {}
  })

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

  const handleSubmit = evt => {
    evt.preventDefault()
    const tempMap = new google.maps.Map(document.getElementById('tempMap'))
    const search = new google.maps.places.PlacesService(tempMap)
    const location = new google.maps.LatLng(
      currentLocation.latitude,
      currentLocation.longitude
    )
    search.textSearch(
      {
        query: searchQuery,
        location,
        radius: 10000
      },
      (response, status) => setMarkers(response.slice(0, 3))
    )
    setSearchQuery('')
  }

  const onMarkerClick = (props, marker, e) => {
    setInfoWindow({
      activeMarker: marker,
      isVisible: true,
      data: props
    })
  }

  const selectAndPostStore = location => {
    console.log(location.lat(), location.lng())
    // post to DB trip model
    // redirect to next interface
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

      <div className="select-store__map">
        {currentLocation.latitude ? (
          <Map
            google={props.google}
            zoom={12}
            initialCenter={{
              lat: currentLocation.latitude,
              lng: currentLocation.longitude
            }}
          >
            {markers
              ? markers.map((marker, idx) => (
                  <Marker
                    key={idx}
                    onClick={onMarkerClick}
                    name={marker.name}
                    address={marker.formatted_address}
                    position={marker.geometry.location}
                  />
                ))
              : null}
            <InfoWindowEx
              marker={infoWindow.activeMarker}
              visible={infoWindow.isVisible}
            >
              <div>
                <h3>{infoWindow.data.name}</h3>
                <p>{infoWindow.data.address}</p>
                <button
                  onClick={() => selectAndPostStore(infoWindow.data.position)}
                  type="button"
                >
                  Select this Store
                </button>
              </div>
            </InfoWindowEx>
          </Map>
        ) : (
          'Please share your location to use this app!'
        )}
      </div>

      <div id="tempMap" />
    </div>
  )
}

export default GoogleApiWrapper({apiKey: googleApiKey})(SelectStore)
