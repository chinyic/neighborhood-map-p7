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
      query: '',
  //    filterQuery: '',
      value: '',
      markers: [],
      updateCentralState: obj => {
        this.setState(obj);
      }
    }
//this.handleMarkerClick = this.handleMarkerClick.bind(this);
this.handleListItemClick = this.handleListItemClick.bind(this);
this.filterVenues = this.filterVenues.bind(this);
  }


  componentDidMount(){
    this.getVenues();

  }




  getVenues = (queryVenue) => {
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

//function to toggle marker click through Map
/*    handleMarkerClick = (marker) => {
      //this.closeAllMarkers();
      //marker.isOpen = true;
      const venue =this.state.venues.find(venue => venue.id === marker.id);
      this.setState({markers: Object.assign(this.state.markers, marker) });
    }
*/

//function to bind list item clicked to marker click
    handleListItemClick = (venue) => {
      const marker = this.state.markers.find(marker => marker.id === venue.id);
      this.handleMarkerClick(marker)

    }


/*you have a callback passed to list
list calls the callback when the search term changes
App gets notified, and knows the new search term, and filters its venues data it had stored in its state
this should work for the filtering of markers already
and should also auto-update List because List also only shows venues it received*/
   filterVenues = (query) => {
      if (this.state.query.trim() !== "") {
        let venues =
        this.state.venues.filter(venue =>
        this.venue.name
        .toLowerCase()
        .includes(this.state.query.toLowerCase())
       )
       return venues;

      }
      return this.state.venues;
       console.log("venues");
       this.setState({query: query});
    }




render() {

  return (
      <div className ="App">
      <ListView
      venues={this.state.venues}
      filterVenues={this.filterVenues}
      handleListItemClick={this.handleListItemClick}>
      </ListView>

      <Map venues={this.state.venues} > </Map>

      </div>
    );
  }
}
/*
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>

*/



export default App;
