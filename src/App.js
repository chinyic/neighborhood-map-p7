import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


class App extends Component {

  componentDidMount(){
    this.renderMap()
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
    query: "outdoors",
    near: "Sydney",
    v: "20182109"
  }

  axios.get(endPoint + new URLSearchParams(parameters))
  .then(response => {
    //response when we get this through axios
    console.log(response)
  })
  .catch(error => {
    //catch error
    console.log("error " + error)
  })
}

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
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
