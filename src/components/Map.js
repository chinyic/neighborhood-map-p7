import React, { Component } from 'react';
import '../App.css';


class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
        map: null,
        venues: props.venues,
        markers: []
    }
  }

  render() {
    return (
      <div id="map" aria-label="map" role ="application" tabIndex="-1">
      </div>
    );
  }
}

export default Map;
