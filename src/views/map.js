import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import $ from 'jquery';
import { Map, GoogleApiWrapper } from 'google-maps-react';
const mapStyles = {
  width: '100%',
  height: '100%',
};
class MapTemplate extends Component {
	 componentDidMount() {

	 }
	
render() {
    return (
	<body style={{height:"100%", margin: "0px", padding:"0px"}}>
	<div id="mapM">
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        />
	    </div>
	    </body>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBY6v3bJwMKv6Ov4t1pVjGX0byoaX1K2gI'
})(MapTemplate)



//export default MapTemplate;



