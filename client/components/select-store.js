import React, {Component} from 'react'

import {Map, GoogleApiWrapper} from 'google-maps-react'
import {googleApiKey} from '../../secrets'

class SelectStore extends Component {
  constructor() {
    super()
    this.state = {currentLocation: [0, 0]}
  }

  componentDidMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const {coords} = position
        this.setState({currentLocation: [coords.latitude, coords.longitude]})
      })
    }
  }

  render() {
    console.log(this.state)
    return <Map google={this.props.google} zoom={14} />
  }
}

export default GoogleApiWrapper({apiKey: googleApiKey})(SelectStore)
