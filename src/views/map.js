import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import $ from 'jquery';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import AppBar from '../components/AppBar';
import SearchBar from '../components/SearchBar';
import Grid from '@material-ui/core/Grid';

const mapStyles = {
  width: '100%',
  height: '100%',
};

const stores = [];
const storeDetails = [];

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
		    var tmpDetails = {};
		    for(var j = 0; j < line.length; j++){
			if(j == 0){
			    tmpDetails.usr = line[j];
			}
			if(j == 1){
			    tmpDetails.nm = line[j];
			}
		        if(j == 2){
			    tmpDetails.dt = line[j];
			}
			if(j == 3){
			    tmp.lat = JSON.parse(line[j]); //Parse to remove quotes
			}
			if(j == 4){
			    tmp.lng = JSON.parse(line[j]);
			}
			if(j == 5){
			    tmpDetails.tm = line[j];
			}
			if(j == 6){
			    tmpDetails.id = line[j];
			}
		    }
		    tmpDetails.pos = tmp;
		    storeDetails.push(tmpDetails);
		    stores.push(tmp);
		}
	}
});

class MapTemplate extends Component {
	constructor(props) {
        super(props);
		this.state = {
		    showingInfoWindow: false,
		    activeMarker: {},
		    selectedPlace: {},
		  }
		 this.onMarkerClick = this.onMarkerClick.bind(this);
		 this.onMapClicked = this.onMapClicked.bind(this);
	}
	onMarkerClick(props, marker, e) {
	    console.log(props);
	    console.log(marker);
	    console.log(e);
            this.setState({
	      selectedPlace: props,
	      activeMarker: marker,
	      showingInfoWindow: true
	    });
	}
	onMapClicked = (props) => {
	    if (this.state.showingInfoWindow) {
	      this.setState({
		showingInfoWindow: false,
		activeMarker: null
	      })
	    }
  	};
	getName(tempo){
	    for (var i = 0; i < storeDetails.length; i++) { 
		if(storeDetails[i].pos == tempo){
		    return storeDetails[i].usr + "," + storeDetails[i].nm + "," + storeDetails[i].dt + "," + storeDetails[i].tm + "," + storeDetails[i].id;
		}
	    }
	}

render() {
    let head1, p1, p2, p3;
    var x;
    if(typeof this.state.selectedPlace.name !== "undefined"){
	var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
	x = this.state.selectedPlace.name.split(",");
	var today  = new Date(x[2]);
	var new1 = today.toLocaleDateString("en-US", options);
	var li = "/show-meal?meal=" + x[4];
	head1 = <h1><a href={li}>{x[1]}</a></h1>; //Meal Name Make this a link to view meal with ID as param meal
	p1 = <p>Host: {x[0]}</p>;
	p2 = <p>Date: {new1}</p>;
	p3 = <p>Time: {x[3]}</p>;
    }
    return (
	<Grid class="main-body" container>
	
		<Grid container item xs={12} justify="center">
			<SearchBar />
		</Grid>
		<Grid id="mapM" item>
			<Map
			google={this.props.google}
		onClick={this.onMapClicked}
			zoom={13}
			style={mapStyles}
			initialCenter={{ lat: 55.9533, lng: -3.1883}}
			>
			{
				stores.map(element => <Marker name={this.getName(element)} position={element} onClick={this.onMarkerClick}/>)
			}
			<InfoWindow
					marker={this.state.activeMarker}
					visible={this.state.showingInfoWindow}>
					<div style={{color:"black"}}>
					{head1}
					{p1}
					{p2}
					{p3}
					</div>
				</InfoWindow>
			</Map>
			</Grid>
	</Grid>	


    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBY6v3bJwMKv6Ov4t1pVjGX0byoaX1K2gI'
})(MapTemplate)

//export default MapTemplate;



