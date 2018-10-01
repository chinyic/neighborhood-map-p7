import React, { Component } from 'react';
import axios from 'axios';


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
    this.getVenues()
    }

  loadGoogleMapsAPI = () => {
      this.loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCChKtHxb-Ay4LpdDllRMl3pT1kdel_rI8&callback=handleGoogleMapsAPICallback")
      window.handleGoogleMapsAPICallback = this.handleGoogleMapsAPICallback
    }

  handleGoogleMapsAPICallback = () => {
    this.initMap()
    this.updateMapDisplay()
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
          //response when we get this through axios
          console.log(response.data.response.groups[0].items)
        })
        .catch(error => { //catch error
          console.log("error " + error)
        })
      }

    updateMapDisplay = () => {
        //creating infowindow
        let infowindow = new window.google.maps.InfoWindow();

          //create dynamic markers

      this.state.venues.map( displayVenue => {
            //create marker for each venue on map
            //looping over venues inside the state ->
          let marker = new window.google.maps.Marker({
            position: {lat: displayVenue.venue.location.lat, lng: displayVenue.venue.location.lng},
            map: this.state.map,
            title: displayVenue.venue.name,
            animation: window.google.maps.Animation.DROP
            });

          let contentString = `${displayVenue.venue.name}`;
            //bind marker and infowindow so when clicked infowindow opens

          marker.addListener('click', function() {
            //add animation to marker
            if (marker.getAnimation() !== null) { marker.setAnimation(null); }
               else { marker.setAnimation(window.google.maps.Animation.BOUNCE); }
               setTimeout(() => { marker.setAnimation(null) }, 1500);
            //set content of InfoWindow
            infowindow.setContent(contentString)
            //open the infowindow
            infowindow.open(this.state.map, marker);
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
