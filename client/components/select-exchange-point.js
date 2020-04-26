import React, {useState, useEffect} from 'react'
import axios from 'axios'

import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'
import InfoWindowEx from './info-window'
import {googleApiKey} from '../../secrets'

const SelectExchangePoint = props => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0
  })
  const [marker, setMarker] = useState({})
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

  const onMarkerClick = (props, marker, e) => {
    setInfoWindow({
      activeMarker: marker,
      isVisible: true,
      data: props
    })
  }

  const onMapClick = (t, map, coord) => {
    // const tempMap = new google.maps.Map(document.getElementById('tempMap'))
    // const search = new google.maps.places.PlacesService(tempMap)
    // search.findPlaceFromQuery(
    //   {
    //     query: [location],
    //   },
    //   (response, status) => console.log('response', response.slice(0, 3))
    // )
    const {latLng} = coord
    const lat = latLng.lat()
    const lng = latLng.lng()
    setMarker({position: {lat, lng}})
    setCurrentLocation({latitude: lat, longitude: lng})
  }

  const selectAndPostStore = location => {
    console.log(location.lat(), location.lng())
    // post to DB trip model
    // redirect to next interface
  }

  return (
    <div className="select-store">
      <div>Choose Where You Would Like To Exchange Groceries:</div>

      <div className="select-store__map">
        {currentLocation.latitude ? (
          <Map
            google={props.google}
            zoom={12}
            controlSize={10}
            style={{height: '50%', width: '50%'}}
            onClick={onMapClick}
            initialCenter={{
              lat: currentLocation.latitude,
              lng: currentLocation.longitude
            }}
          >
            {marker.position ? (
              <Marker
                onClick={onMarkerClick}
                name={`${marker.position.lat}, ${marker.position.lng}`}
                position={marker.position}
              />
            ) : null}
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
                  Exchange Groceries Here
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

export default GoogleApiWrapper({apiKey: googleApiKey})(SelectExchangePoint)
