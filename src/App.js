import React, { Component } from 'react';

import './App.css';
import axios from 'axios';
import Map from './components/Map';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],

    }
  }







render() {
  return (
      <main>
      <Map ></Map>
      </main>
    );
  }
}
/*
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>

*/



export default App;
