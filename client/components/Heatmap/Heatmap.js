import React, {useState} from 'react'
import ReactMapGL, {Source, Layer} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from './layers'

export const Heatmap = () => {
  const [viewport, setViewport] = useState({
    width: 500,
    height: 500,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
    bearing: 0,
    pitch: 0
  })

  const sourceRef = React.createRef()

  return (
    <div>
      <ReactMapGL
        {...viewport}
        onViewportChange={setViewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken="pk.eyJ1IjoiYXRoZW5zMTk1IiwiYSI6ImNrMTZseGN3OTAwbXkzY3FwZGthdXpyamsifQ.Gwa7dlJDJrvLrTrEHVW6ZA"
      >
        <Source
          type="geojson"
          data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
          ref={sourceRef}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </ReactMapGL>
    </div>
  )
}
