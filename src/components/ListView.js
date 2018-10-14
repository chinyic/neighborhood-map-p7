import React, { Component } from 'react';
import '../App.css';
//import Map from '../components/Map';


class ListView extends Component {
  constructor(props){
    super(props);
    this.state = {
      venues: props.venues,
      query: "",
      value: "",
      markers: props.markers,
      isVisible: ""
      }
    this.handleChange = this.handleChange.bind(this);

  }




  handleChange = event => {

    // this.props.value(event.target.value);

     this.setState({query: event.target.value});

  /*   const markers = this.props.venues.map(venue => {
       const isMatched = this.props.venues.name
       .toLowerCase()
       .includes(event.target.value.toLowerCase());

       const marker = this.props.markers.find(marker.id === venue.id);
       if (isMatched) {
         markers.isVisible = true;

       } else {
         marker.isVisible = false;
       }
       return marker;
     });
*/
//     this.props.updateCentralState({markers})
   }

   /*handleSubmit(event) {
     this.props.filter(this.state.value)
     event.preventDefault();
   }
*/

/*
   componentDidMount() {
     this.showVenues(this.state.venues)
   }

   showVenues = (venues) => {

     console.log("venues", venues)
     this.props.venues.map(displayVenue => {
       let contentString = `
       <div>
       ${displayVenue.venue.name}
       </div>`
     })
     this.setState({
       venues: venues
     })
   }
*/
  render() {
//const venues = this.state.venues;
var value = this.state.value;

    return (
      //list of venues here
      <div id ="sidebar">

      <input
      type={"search"}
      id={"search"}
      placeholder = {"Filter"}
      name="venue-type"
      value={this.props.query}
      onChange={(e) => {this.props.filterVenues(e.target.value)}}
      />

      <div id ="listview">
       <ol className ="venueList">
      {
        this.props.venues && this.props.venues.map((venue, venueKey) => (
          <li className ="listitem"
          onClick={() => this.props.handleListItemClick(venue, venueKey)}

          key = {venueKey}

          //{...venue}

          //venues = {this.props.filterVenues}
        //  handleListItemClick={this.props.handleListItemClick}
          >

          {this.props.venues[venueKey].venue.name}
          </li>


     ))}
     </ol>
      </div>

      </div>

    /*



      <nav id='list-nav'>

        <ul>

          {this.props.venues.map(function(venue, index){
            return
            <li key={index} {...venue}>

            <a onClick= {() => this.handleClick(venue.venue.id)} className="drawer-name">

                    var venueId = venue.venue.id
                    if (marker.id === nameId) {
                            window.google.maps.event.trigger('click')
                          }
            </a>
            </li>


      })
    }
  </ul>

  </nav>

      </div>

      */
      );
    }
  }


export default ListView;
