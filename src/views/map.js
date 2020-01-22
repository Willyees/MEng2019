import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import $ from 'jquery';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
const mapStyles = {
  width: '100%',
  height: '100%',
};
const stores = [{lat: 47.49855629475769, lng: -122.14184416996333},
              {lat: 47.359423, lng: -122.021071},
              {lat: 47.2052192687988, lng: -121.988426208496},
              {lat: 47.6307081, lng: -122.1434325},
              {lat: 47.3084488, lng: -122.2140121},
              {lat: 47.5524695, lng: -122.0425407}];

$.ajax({ url: 'PHPF/getmeals.php',
	type: 'post',
	dataType : "json",
	async: false,
	success: function(output) {
		console.log(output);
		var ret = output;
		console.log(ret[0]);
		for (var i = 0; i < ret.length; i++) {
		    var line = ret[i].split(',');
		    console.log(line);
		    var tmp = {};
		    for(var j = 0; j < line.length; j++){
			if(j == 3){
			    tmp.lat = JSON.parse(line[j]);
			}
			if(j == 4){
			    tmp.lng = JSON.parse(line[j]);
			}
		    }
		    stores.push(tmp);
		    console.log(tmp);
		    console.log(stores);
		}
	}
});
class MapTemplate extends Component {
	
render() {
    return (
	<body style={{height:"100%", margin: "0px", padding:"0px"}}>
	<div id="mapM">
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 55.9533, lng: -3.1883}}
	    >
	    <Marker position={{ lat: 48.00, lng: -122.00}}/> 
	    {
		    stores.map(element => <Marker position={element}/>)
	    }
        </Map>
	    </div>
	    </body>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBY6v3bJwMKv6Ov4t1pVjGX0byoaX1K2gI'
})(MapTemplate)



//export default MapTemplate;



