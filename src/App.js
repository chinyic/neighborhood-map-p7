import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


class App extends Component {

  state = {
    venues: []
  }

  componentDidMount(){
    this.getVenues()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCChKtHxb-Ay4LpdDllRMl3pT1kdel_rI8&callback=initMap")
    window.initMap = this.initMap
    // map inside window
  }

//get venues from foursquare
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
    }, this.renderMap()) //pass renderMap as a callback function
    //response when we get this through axios
    console.log(response.data.response.groups[0].items)
  })
  .catch(error => {
    //catch error
    console.log("error " + error)
  })
}

  initMap = () => {

    //create map
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 1.3319292, lng: 103.835725},
      zoom: 8
    });

    //creating infowindow
    var infowindow = new window.google.maps.InfoWindow();

    //create dynamic markers
    this.state.venues.map( displayVenue => {


      //create marker for each venue on map
      //looping over venues inside the state ->
      var marker = new window.google.maps.Marker({
         position: {lat: displayVenue.venue.location.lat, lng: displayVenue.venue.location.lng},
         map: map,
         title: displayVenue.venue.name

      });

      var contentString = `${displayVenue.venue.name}`;

      //bind marker and infowindow so when clicked infowindow opens
      marker.addListener('click', function() {
          //set content of InfoWindow
          infowindow.setContent(contentString)

          //open the infowindow
          infowindow.open(map, marker);
        });


    })

      }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    );
  }
}
/*
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>

*/
function loadScript(url){
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)

}

export default App;
