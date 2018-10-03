import React, { Component } from 'react';
import '../App.css';
import Map from '../components/Map';

class ListView extends Component {
  constructor(props){
    super(props);
    this.state = {
        venues: []
      }


  }

  render() {
    return (
      <div id='list-view'>

      </div>
      );
    }
  }


export default ListView;
