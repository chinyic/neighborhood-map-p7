import React, { Component } from 'react';
import ListView from './components/ListView';
import './App.css';
import axios from 'axios';
import Map from './components/Map';

class App extends Component {
  constructor(props) {
    super(props);
    this.originalVenues = [];
    this.markers = [];
    this.infowins = [];
    this.state = {
      venues: [],
      query: '',
      value: '',
      markers: [],
      infowins: [],
      updateCentralState: obj => {
        this.setState(obj);
      }
    }
this.handleListItemClick = this.handleListItemClick.bind(this);
//this.handleMarkerClick = this.handleMarkerClick.bind(this);
this.filterVenues = this.filterVenues.bind(this);
  }


  componentDidMount(){
    this.getVenues();
    this.loadGoogleMapsAPI();
  }




  getVenues = (queryVenue) => {
    //get venues from foursquare
      const venueRequest = "https://api.foursquare.com/v2/venues/explore?"
      const parameters = {
        client_id: "IJPVVPMRYVCXDQWC2U3TZ1BSTN0CYDCENFXHVRFIMP2AXQD5",
        client_secret: "CF2YBQTYE5X1XH0C3YLOIAPRJQ0110YE3GZCCBSBQ2YK5P5Z",
        query: "zichar",
        near: "Singapore",
        limit: 10,
        v: "20182109"
      }

      axios.get(venueRequest + new URLSearchParams(parameters))
      .then(response => {
        this.originalVenues = response.data.response.groups[0].items;
        this.setState({
          venues: this.originalVenues
        })
      })
      .catch(error => { //catch error
        console.log("error " + error)
      })
    }


    //maps

      // This is a React in-built callback that runs whenever the component's state is updated.
      // In this case, calls when venues data is set through 'setState'

    componentDidUpdate() {
      this.updateMapDisplay(this.state.venues)

  //    this.showMarker(this.props.showMarkerId)
    }

    loadGoogleMapsAPI = () => {
      this.loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCChKtHxb-Ay4LpdDllRMl3pT1kdel_rI8&callback=handleGoogleMapsAPICallback")
      window.handleGoogleMapsAPICallback = this.handleGoogleMapsAPICallback
    }

    handleGoogleMapsAPICallback = () => {
      this.initMap()
    }

    loadScript = (url) => {
      var index = window.document.getElementsByTagName("script")[0]
      var script = window.document.createElement("script")
      script.src = url
      script.async = true
      script.defer = true
      index.parentNode.insertBefore(script, index)
      }

    initMap = () => {
        const newMap = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 1.3319292, lng: 103.835725},
        zoom: 12
        });
        let infowindow = new window.google.maps.InfoWindow();
        this.setState({
          map: newMap,
          infowindow: infowindow
        })
      }
//this updates map with markers and infowindows
    updateMapDisplay = (venuesData) => {
      //reset map and clear markers upon init
      this.markers.forEach(x => x.setMap(null))
      this.markers = [];
      let infowins = [];
      let infowindow = new window.google.maps.InfoWindow();
      window.map = this.state.map;
      venuesData.forEach( venueIndex => {
        console.log("Building marker for venue: ", venueIndex)

          let marker = new window.google.maps.Marker({
              position: {lat: venueIndex.venue.location.lat,
              lng: venueIndex.venue.location.lng},
              map: this.state.map,
              title: venueIndex.venue.name,
              id: venueIndex.venue.id,
          //    animation: window.google.maps.Animation.DROP,

          });
          console.log("marker", marker)
          marker.addListener('click', () => {

            var contentString = `
            <div id ="infoWinContent">
              <h2 id ="venueName">
              ${venueIndex.venue.name}
              </h2>
              <p id ="venueAddress">
              ${venueIndex.venue.location.formattedAddress[0]}
              <br>
              ${venueIndex.venue.location.formattedAddress[1]}
              </p>
              <div id ="venueType">
              ${venueIndex.venue.categories[0].name}
              </div>
            </div>
            `;
            //set content of InfoWindow, open infowindow
            infowindow.setContent(contentString)
            infowindow.open(window.map, marker);

            //add animation to marker
            if (marker.getAnimation() !== null) { marker.setAnimation(null); }
              else { marker.setAnimation(window.google.maps.Animation.BOUNCE); }
              setTimeout(() => { marker.setAnimation(null) }, 1500);
          })
          infowins.push(infowindow);
          this.markers.push(marker);
          console.log(this.state.venues);
        });
      }


//function to toggle marker click through Map
/*   handleMarkerClick = (marker) => {
      //this.closeAllMarkers();
      //marker.isOpen = true;
      var venue =this.state.venues.find(venue => venue.id === marker.id);
      this.setState({markers: Object.assign(this.state.markers, marker) });
    }
*/

//function to bind list item clicked to marker click
    handleListItemClick = (venueClick) => {
      let marker = this.markers;
      let content = `
        <div id="infowindow">
        <h1 class = "infoHeader">
          ${venueClick.venue.name}
        </h1>
        <p>
          ${venueClick.venue.location.formattedAddress[0]}
        </p>
        <p>
          ${venueClick.venue.location.formattedAddress[1]}
        </p>
        </div>`;
      marker.filter(filteredM => {
      if (filteredM.id === venueClick.venue.id) {
        //console.log('click', filteredM.id, venueClick.venue.id)
      this.state.infowindow.setContent(content);
      this.state.infowindow.open(this.initMap, filteredM);
      filteredM.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(() => { filteredM.setAnimation(null) }, 1500);
      } else {
        filteredM.setAnimation(null);
        }
      })
    }

/* have a callback passed to list
list calls the callback when the search term changes
App gets notified, and knows the new search term, and filters its venues data it had stored in its state
this should work for the filtering of markers already
and should also auto-update List because List also only shows venues it received*/
   filterVenues = (newQuery) => {
      if (newQuery.trim() !== ""){
        let filteredV= this.originalVenues.filter(venue =>
        venue.venue.name.toLowerCase().includes(newQuery.toLowerCase())
        )
          this.state.markers.forEach(filteredM => {
          filteredM.name.toLowerCase().includes(newQuery) ?
          filteredM.setVisible(true) :
          filteredM.setVisible(false);
          })
          this.setState({venues: filteredV, query: newQuery});
      }
      else {
        this.setState({venues: this.originalVenues})
      };
      console.log('venues', this.state.venues)
    }





render() {

  return (
      <div className ="App" aria-label="App">
      <ListView
      venues={this.state.venues}
      filterVenues={this.filterVenues}
      handleListItemClick={this.handleListItemClick}
      handleMarkerClick={this.handleMarkerClick}
      markers={this.state.markers}
      query = {this.query}
      >
      </ListView>

      <Map
      venues={this.state.venues}
      handleMarkerClick={this.handleMarkerClick}
      > </Map>

      </div>
    );
  }
}
/*
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>

*/



export default App;
