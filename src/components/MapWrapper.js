
import React, {Component} from 'react'
import Map, {GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
  };

class MapWrapper extends Component{
    constructor(props){
        super(props);
        this.state = {
            showingInfoWindow: false,
		    activeMarker: {},
            selectedPlace: {},
            mapWidth : props.mapWidth,
            infoWindowVisib : props.infoWindowVisib
        }
        mapStyles.width = props.mapWidth + "%";
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
        this.renderMarkers = this.renderMarkers.bind(this);
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
      
    renderMarkers(){
        var output = [];
        console.log(this.props.meals);
        this.props.meals.forEach((v,k) => {
            v.forEach(element => {
                output.push(<Marker name={element.usr + "," + element.nm + "," + element.dt + "," + element.tm + "," + element.id}
                position={element.pos} onClick={this.onMarkerClick}/>)
            })
        
            
        });
        console.log(output);
        return output;
    }
    render(){
        console.log("CENTER: ");
        console.log(this.props.mapCenter)
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
        // console.log(this.props.meals)
        //     if(this.props.meals.length != 0){
        //         console.log("setting center map");
        //         this.setState({mapCenter : this.props.meals.values().next().value.position});
        //     }
        return(
            <Map
			google={this.props.google}
		onClick={this.onMapClicked}
			zoom={13}
			style={mapStyles}
            //initialCenter={this.props.mapCenter}
            center={this.props.mapCenter}
            initialCenter = {this.props.mapCenter}
			>
                {this.renderMarkers()}
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
        );
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBY6v3bJwMKv6Ov4t1pVjGX0byoaX1K2gI'
  })(MapWrapper);