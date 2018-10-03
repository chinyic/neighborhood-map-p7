import React, { Component } from 'react';
import ListView from './components/ListView';
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

  componentDidMount(){
    this.getVenues()
  }

  getVenues = () => {
    //endpoint is API endpoint
      const endPoint = "https://api.foursquare.com/v2/venues/explore?"
      const parameters = {
        client_id: "IJPVVPMRYVCXDQWC2U3TZ1BSTN0CYDCENFXHVRFIMP2AXQD5",
        client_secret: "CF2YBQTYE5X1XH0C3YLOIAPRJQ0110YE3GZCCBSBQ2YK5P5Z",
        query: "trails",
        near: "Singapore",
        v: "20182109"
      }

      axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        })
      })
      .catch(error => { //catch error
        console.log("error " + error)
      })
    }







render() {
  return (
      <main>
      <Map venues = {this.state.venues}></Map>
      </main>
    );
  }
}
/*
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>

*/



export default App;
