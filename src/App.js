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
  //    filterQuery: '',
      value: '',
      markers: [],
      updateCentralState: obj => {
        this.setState(obj);
      }
    }

  }


  componentDidMount(){
    this.getVenues();

  }




  getVenues = (query) => {
    //endpoint is API endpoint
      const venueRequest = "https://api.foursquare.com/v2/venues/explore?"
      const parameters = {
        client_id: "IJPVVPMRYVCXDQWC2U3TZ1BSTN0CYDCENFXHVRFIMP2AXQD5",
        client_secret: "CF2YBQTYE5X1XH0C3YLOIAPRJQ0110YE3GZCCBSBQ2YK5P5Z",
        query: "trails",
        near: "Singapore",
        limit: 10,
        v: "20182109"
      }


      axios.get(venueRequest + new URLSearchParams(parameters))
      .then(response => {



        this.setState({
          venues: response.data.response.groups[0].items

        })

      })
      .catch(error => { //catch error
        console.log("error " + error)
      })
    }


    handleMarkerClick = marker => {
      //this.closeAllMarkers();
      //marker.isOpen = true;
      const venue = this.state.venues.find(venue => venue.id === marker.id);
      this.setState({markers: Object.assign(this.state.markers, marker) });
    }


    handleListItemClick = venue => {
      const marker = this.state.markers.find(marker => marker.id === venue.id);
      this.handleMarkerClick(marker)
    }


render() {

  return (
      <div className ="App">
      <ListView {...this.state} handleListItemClick={this.handleListItemClick}></ListView>

      <Map {...this.state} handleMarkerClick={this.handleMarkerClick}> </Map>

      </div>
    );
  }
}
/*
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>

*/



export default App;
