import React, { Component } from 'react';
import '../App.css';
import Map from '../components/Map';


class ListView extends Component {
  constructor(props){
    super(props);
    this.state = {
      venues: [],
      query: "",
      value: "",
      markers: [],
      isVisible: ""
      }
    this.handleChange = this.handleChange.bind(this);
  }


  filterVenues = () => {
    if (this.state.query.trim() !== "") {
      const venues = this.state.venues.filter(venue =>
      venue.name
      .toLowerCase()
      .includes(this.state.query.toLowerCase())
     )
     return venues;
     console.log(venues);
    }
    return this.props.venues;
  }

  handleChange = event => {

    // this.props.value(event.target.value);

     this.setState({query: event.target.value});

     const markers = this.state.venues.map(venue => {
       const isMatched = venue.name
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

     this.props.updateCentralState({markers})
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
const value = this.state.value;

    return (
      //list of venues here
      <div id ="sidebar">

      <input
      type={"search"}
      id={"search"}
      placeholder = {"Filter"}
      name="venue-type"
      value={value}
      onChange={this.handleChange}
      />

      <div id ="list-view">
       <ol className ="venueList">
      {
        this.props.venues && this.props.venues.map((venue,idx) => (
          <li className ="listItem"
          onClick={() => this.props.handleListItemClick(this.props)}

          key = {idx}
          {...venue}

          venues = {this.filterVenues()}
          handleListItemClick={this.props.handleListItemClick}
          >

          {this.props.venues[idx].venue.name}
          </li>


     ))}
     </ol>
      </div>

      </div>

    /*
    <div id='list-view'>
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type={"search"} id={"search"}
          placeholder = 'Filter'
          name="venue-type" value={this.state.value} onChange={this.handleChange}/>
        </label>
          <input type="submit" value="Filter" />
      </form>




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
