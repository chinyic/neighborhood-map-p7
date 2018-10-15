import React, { Component } from 'react';
import '../App.css';
import { slide as Menu } from 'react-burger-menu';


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


  showList(event) {
    event.preventDefault();
  }

  handleChange = event => {
    this.setState({query: event.target.value});
  }

  render() {
    return (
      <Menu isOpen right>
        <div id ="sidebar" aria-label = "Side Bar">
          <div id ="header" aria-label="Header" tabIndex ='0'>
          <h1>Places to Eat</h1>
          </div>
              <input
              type={"search"}
              id={"search"}
              placeholder = {"Filter"}
              name="venue-type"
              value={this.props.query}
              onChange={(e) => {this.props.filterVenues(e.target.value)}}
              aria-label = "Search Venues"
              />
          <div id ="listview" aria-label = "List of Venues">

            <ol className ="venueList">
              {this.props.venues && this.props.venues.map((venue, venueKey) => (
               <li className ="listitem"
                onClick={() => this.props.handleListItemClick(venue, venueKey)}

                key = {venueKey}
                aria-label = {venue.venue.name}
                tabIndex = "0"
                >

                {this.props.venues[venueKey].venue.name}
                </li>
              ))
              }
              </ol>
            </div>
          </div>
        </Menu>
      );
    }
  }


export default ListView;
