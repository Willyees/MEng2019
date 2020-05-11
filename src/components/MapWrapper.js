
import React, {Component} from 'react'
import Map, {GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
//import google_api_key from '../google_api_key'

/**
 * enum used to understand the type of data to be shown in the boxes
 */
export const mealInfoEnum = {
    ADDRESS : 0,
    DATE : 1,
    NONE : 2
}

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
        console.log(props)
        console.log(mapStyles.width)
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
        this.renderMarkers = this.renderMarkers.bind(this);
    }

    onMarkerClick(props, marker, e) {
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
        this.props.meals.forEach((v,k) => {
            v.forEach(element => {
                console.log(element)
                if(this.props.mealInfoType == mealInfoEnum.DATE){
                    let pos = {lat: element.lat, lng: element.lon};
                    console.log(pos)
                    output.push(<Marker name={element.host + "," + element.title + "," + element.date + "," + element.time + "," + element.id}//todo dont use the variable names
                    position={pos} onClick={this.onMarkerClick}/>)
                }
                else if(this.props.mealInfoType == mealInfoEnum.ADDRESS){
                    let pos = {lat: element.lat, lng: element.lon};
                    console.log(pos)

                    output.push(<Marker name={element.title + "," + element.address + "," + element.city}//post code needed
                    position={pos} onClick={this.onMarkerClick}/>)
                }
            })
        
            
        });
        console.log(output);
        return output;
    }
    render(){
        console.log("CENTER: ");
        console.log(this.props.mapCenter)
        let info = [];
        var x;
        if(typeof this.state.selectedPlace.name !== "undefined"){
            if(this.props.mealInfoType == mealInfoEnum.DATE){
                var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
                x = this.state.selectedPlace.name.split(",");
                var today  = new Date(x[2]);
                var new1 = today.toLocaleDateString("en-US", options);
                var li = "/show-meal?meal=" + x[4];
                info.push(<h1><a href={li}>{x[1]}</a></h1>); //Meal Name Make this a link to view meal with ID as param meal
                info.push(<p>Host: {x[0]}</p>);
                info.push(<p>Date: {new1}</p>);
                info.push(<p>Time: {x[3]}</p>);
            }
            else if(this.props.mealInfoType == mealInfoEnum.ADDRESS){
                x = this.state.selectedPlace.name.split(",");
                console.log(x)
                info.push(<h1>{x[0]}</h1>)
                let dateInfoLabels = ["Title:", "Address:", "City:"]//, "PostCode :", "Contry:"]//coudl pass them as parameters
                for(var i = 1; i < x.length; i++){
                    info.push(<p>{dateInfoLabels[i]} {x[i]}</p>);
                }
            }
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
                {this.state.infoWindowVisib &&
			<InfoWindow
					marker={this.state.activeMarker}
					visible={this.state.showingInfoWindow}>
					<div style={{color:"black"}}>
					{info}
					</div>
				</InfoWindow>}
			</Map>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: 'your_key_goes_here'
  })(MapWrapper);