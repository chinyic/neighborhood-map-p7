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
      value: '',
      markers: [],
      infowins: [],
      updateCentralState: obj => {
        this.setState(obj);
      }
    }
//this.handleMarkerClick = this.handleMarkerClick.bind(this);
this.handleListItemClick = this.handleListItemClick.bind(this);
this.handleMarkerClick = this.handleMarkerClick.bind(this);
this.filterVenues = this.filterVenues.bind(this);
  }


  componentDidMount(){
    this.getVenues();
    this.loadGoogleMapsAPI();
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
        this.setState({
          map: newMap,
        })
      }
//this updates map with markers and infowindows
    updateMapDisplay = (venuesData) => {
        var markers = [];
        var infowins = [];
        var infowindow = new window.google.maps.InfoWindow();
        window.map = this.state.map;
        venuesData.forEach( displayMarkers => {
          console.log("Building marker for venue: ", displayMarkers)

            let marker = new window.google.maps.Marker({
                position: {lat: displayMarkers.venue.location.lat, lng: displayMarkers.venue.location.lng},
                map: this.state.map,
                title: displayMarkers.venue.name,
                id: displayMarkers.id,
                animation: window.google.maps.Animation.DROP,
            });
            marker.addListener('click', () => {

              var contentString = `
              <div id ="infoWinContent">
                <h2 id ="venueName">
                ${displayMarkers.venue.name}
                </h2>
                <p id ="venueAddress">
                ${displayMarkers.venue.location.formattedAddress[0]}
                <br>
                ${displayMarkers.venue.location.formattedAddress[1]}
                </p>
                <div id ="venueType">
                ${displayMarkers.venue.categories[0].name}
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
            markers.push(marker);
            console.log(this.state.venues);
          //console.log("displaying markers", markers, infowins);
          });


        }


        showMarker = (displayMarkers) =>  {


          }


//function to toggle marker click through Map
   handleMarkerClick = (marker) => {
      //this.closeAllMarkers();
      //marker.isOpen = true;
      var venue =this.state.venues.find(venue => venue.id === marker.id);
      this.setState({markers: Object.assign(this.state.markers, marker) });
    }


//function to bind list item clicked to marker click
    handleListItemClick = (venueClick) => {
      let marker = this.state.markers.filter(filteredM => filteredM.venue.id === venueClick.id)[0];
      let infowindow = this.state.infowins.filter(infowin => infowin.id === venueClick.id)[0];

      if (marker && infowindow) {
      if (marker.getAnimation() !== null) { marker.setAnimation(null); }
      else { marker.setAnimation(this.google.maps.Animation.BOUNCE); }
      setTimeout(() => { marker.setAnimation(null) }, 1500);

      this.infowindow.setContent(this.contentString);
      this.infowindow.open(this.map, marker);
      console.log('click', marker)
      }
    }




/* have a callback passed to list
list calls the callback when the search term changes
App gets notified, and knows the new search term, and filters its venues data it had stored in its state
this should work for the filtering of markers already
and should also auto-update List because List also only shows venues it received*/
   filterVenues = (newQuery) => {
     let filteredV = newQuery
        if (this.state.query.trim() !== ""){
        let filteredV = this.state.venues.filter(venue =>
        venue.name.toLowerCase().includes(newQuery.toLowerCase())
        )
          this.state.markers.forEach(filteredM => {
          filteredM.name.toLowerCase().includes(newQuery) ?
          filteredM.setVisible(true) :
          filteredM.setVisible(false);
        })
   this.setState({venues: filteredV, query: newQuery});

 }
      else {this.venues};

      // return this.state.venues;
       console.log('venues', filteredV)

    }





render() {

  return (
      <div className ="App">
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
