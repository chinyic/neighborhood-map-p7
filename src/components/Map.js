import React, { Component } from 'react';
import '../App.css';
//import ListView from '../components/ListView';


class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
        map: null,
        venues: props.venues,
        markers: []
      }
  }


  componentDidMount(){
    this.loadGoogleMapsAPI()


  }

  // This is a React in-built callback that runs whenever the component's state is updated.
  // In this case, calls when venues data is set through 'setState'

  componentDidUpdate() {
    this.updateMapDisplay(this.props.venues)
    this.showMarker(this.props.showMarkerId)
  }

  loadGoogleMapsAPI = () => {
      this.loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCChKtHxb-Ay4LpdDllRMl3pT1kdel_rI8&callback=handleGoogleMapsAPICallback")
      window.handleGoogleMapsAPICallback = this.handleGoogleMapsAPICallback
    }

  handleGoogleMapsAPICallback = () => {
    this.initMap()
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

  loadScript = (url) => {
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
    }



    // This function is more straightforward now - it only displays data that is passed into it as a parameter in 'venuesData'
    updateMapDisplay = (venuesData) => {
        var markers = [];
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
            markers.push(marker);

            console.log("displaying markers", markers);

        });

    }


    showMarker = (showMarkerId) =>  {

        let infowindow = new window.google.maps.InfoWindow();
        let contentString = `
        <div id ="infoWinContent">
          <h2 id ="venueName">
          ${showMarkerId.venue.name}
          </h2>
          <p id ="venueAddress">
          ${showMarkerId.venue.location.formattedAddress[0]}
          <br>
          ${showMarkerId.venue.location.formattedAddress[1]}
          </p>
          <div id ="venueType">
          ${showMarkerId.venue.categories[0].name}
          </div>
        </div>
        `;
        //set content of InfoWindow
        infowindow.setContent(contentString)
        //open the infowindow
        infowindow.open(window.map, this.marker);

        //bind marker and infowindow so when clicked infowindow opens
        this.marker.addListener('click', function() {
        //add animation to marker
          if (this.marker.getAnimation() !== null) { this.marker.setAnimation(null); }
            else { this.marker.setAnimation(window.google.maps.Animation.BOUNCE); }
            setTimeout(() => { this.marker.setAnimation(null) }, 1500);

        });
        console.log('Show Marker')
      }





    render() {
      return (
        <div id="map">

        </div>

      );
    }
}

export default Map;
