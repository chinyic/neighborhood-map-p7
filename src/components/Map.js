import React, { Component } from 'react';
import '../App.css';
import ListView from '../components/ListView';


class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
        map: null,
        venues: []
      }
  }


  componentDidMount(){
    this.loadGoogleMapsAPI()
  }

  // This is a React in-built callback that runs whenever the component's state is updated.
  // In this case, calls when venues data is set through 'setState'
  componentDidUpdate() {
    this.updateMapDisplay(this.state.venues)
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
      //create map
      const newMap = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 1.3319292, lng: 103.835725},
      zoom: 12
      });

      this.setState({
        map: newMap,

      })
    }




    // This function is more straightforward now - it only displays data that is passed into it as a parameter in 'venuesData'
    updateMapDisplay = (venuesData) => {
        //creating infowindow
        let infowindow = new window.google.maps.InfoWindow();

        //create dynamic markers
        window.map = this.state.map;
        this.props.venues.map( displayVenue => {
          //create marker for each venue on map
          //looping over venues inside the state ->
          console.log("Building marker for venue: displayVenue: ", displayVenue)
          let marker = new window.google.maps.Marker({
              position: {lat: displayVenue.venue.location.lat, lng: displayVenue.venue.location.lng},
              map: this.state.map,
              title: displayVenue.venue.name,
              animation: window.google.maps.Animation.DROP
              });

          let contentString = `
          <div id ="infoWinContent">

            <h2 id ="venueName">
            ${displayVenue.venue.name}
            </h2>

            <p id ="venueAddress">
            ${displayVenue.venue.location.formattedAddress[0]}
            <br>
            ${displayVenue.venue.location.formattedAddress[1]}
            </p>

            <div id ="venueType">
            ${displayVenue.venue.categories[0].name}
            </div>

          </div>
          `;

            //bind marker and infowindow so when clicked infowindow opens
          marker.addListener('click', function() {
            //add animation to marker
            if (marker.getAnimation() !== null) { marker.setAnimation(null); }
              else { marker.setAnimation(window.google.maps.Animation.BOUNCE); }
              setTimeout(() => { marker.setAnimation(null) }, 1500);
            //set content of InfoWindow
            infowindow.setContent(contentString)
            //open the infowindow
            infowindow.open(window.map, marker);
          });
        })

    }


    render() {
      return (
        <div id="map">

        </div>
      );
    }
}

export default Map;
