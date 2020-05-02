import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import $ from 'jquery';
import AppBar from '../components/AppBar';
import SearchBar from '../components/SearchBar';
import Grid from '@material-ui/core/Grid';
import MealList, {MealListHeaderCity, MealListHeaderDate, renderMealList} from '../components/MealList';
import MapWrapper from '../components/MapWrapper'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import {mealInfoEnum} from '../components/MapWrapper'


const stores = [];//[{lat1, lng1}, {..}]
const storeDetails = [];//[{usr, nm, dt, tm, id, city}, {..}]

const objSorted = new Map();

function sortByDate(a,b)
{
	if(new Date(a.date) < new Date(b.date)){
		return -1;
	}
	else if(new Date(a.date) > new Date(b.date)){
		return 1;
	}
	return 0;
}
/**function used to format the meal array into an object sorted by dates. Useful for the meal list component
*@param meals meals retreived from the DB
*/
function sortMealsByDate(meals){
	objSorted.clear();//clear as first thing in case an empty filter string is passed. In this way all the markers will be removed from the map
	if(meals.length == 0){
		console.log("can't sort empty array of meals");
		return;
	}
		
	meals.sort(sortByDate);
	var tempArr = [];//storing all the meal info about mealsC happening at the same day
	var currDate = new Date(meals[0].date);
	
	for(var v of meals){
		let date = new Date(v.date);
		if(date.getTime() != currDate.getTime()){
			objSorted.set(currDate, tempArr);
			tempArr = []
			currDate = date;
			//delete v.dt; //cant delete, or it will also delete on the main array
			tempArr.push(v);
		}
		else{
			//delete v.dt;
			tempArr.push(v);
		}
		
	}
	//push the last arrays
	objSorted.set(currDate, tempArr);
}

//export for debug
export function ajaxCall(output){
	//console.log(output);
	var ret = output;
	//console.log(ret[0]);
	for (var i = 0; i < ret.length; i++) {
		var line = ret[i].split(',');
		//console.log(line);
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
		if(j == 7){			
			tmpDetails.city = line[j];
		}
	}
		tmpDetails.pos = tmp;
		storeDetails.push(tmpDetails);
		stores.push(tmp);
		stores.push(tmpDetails.id);
	}
}
/**
 * used to get the meals from the db. It can be used differernt endnodes based on the prop "endnode" passed to the component
 */
export function getMeals(dbEndNode){
		$.ajax({ url: 'PHPF/' + dbEndNode,
		type: 'post',
		dataType : "json",
		async: false,
		success: ajaxCall
	});

	//DEBUG fields to be used on local project
	if(window.location.host == "localhost:3000"){
		console.log("debug local host");
		var s = ["harrypotter,NEW,2020-03-27,55.933056521037,-3.2131411830015,16:47:30,101,Edinburgh","harrypotter,Mexican,2020-03-27,55.932200701316,-3.2121732994174,21:41:05,102,Glasgow","harrypotter,vALENTINES DINNER,2020-02-11,55.931446508097,-3.2169805625238,13:14:45,104,Edinburgh"];
		ajaxCall(s);

	}
}
//End Debug

class MapTemplate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filtered : false,
			dataMeals : new Map(),
			mapCenter : {},
			sliderBtnChosen : "map-view",
		  }
		 this.handlerFiltered = this.handlerFiltered.bind(this);
		 this.test = this.test.bind(this);
		 this.handleToggleBtnChange = this.handleToggleBtnChange.bind(this);
		
		 //getMeals(endnode);//get the meals and load them into the external arrays
		 sortMealsByDate(props.data);
		 console.log(objSorted)
		 this.state.dataMeals = objSorted;
		 this.state.mapCenter = (objSorted.values().next().done ? this.state.mapCenter : {lat : objSorted.values().next().value[0].lat, lng : objSorted.values().next().value[0].lon})
		 console.log(storeDetails);
		 console.log(this.state);
	}

	test(){
		//objSorted.clear();
		$.ajax({ url: 'PHPF/getinfomeal.php',
		type: 'post',
		async: false,
		data : {"id" : "145"},
		success: function(output){console.log(output)}
		});
	}
	/**
	 * handler passed to the search bar, in order to set the state from a child component upon certain event happened
	 * @param idMeals string representation of array of strings
	 */
	handlerFiltered(idMeals){
		console.log(idMeals);
		idMeals = JSON.parse(idMeals);
		//find the meals using their id and then create a new objsorted by sorting it
		var filteredMeals = [];
		for(var id of idMeals){
			console.log(id);
			for(var index in this.props.data){
				console.log(this.props.data[index].id);
				if(this.props.data[index].id == id){
					console.log("entered");
					filteredMeals.push(this.props.data[index]);
				}
			}
		}
		console.log(typeof(filteredMeals));
		console.log(filteredMeals);
		sortMealsByDate(filteredMeals);
		//update the state to update the meallist
		console.log(objSorted);
		this.setState({filtered: true, dataMeals : objSorted, mapCenter : (objSorted.values().next().done ? this.state.mapCenter : {lat : objSorted.values().next().value[0].lat, lng : objSorted.values().next().value[0].lon})});
	}

	handleToggleBtnChange(e, v){
		console.log(v);
		this.setState({sliderBtnChosen : v});
	}

	componentDidMount(){
        console.log(this.props)
    }
	/*getName(tempo){
	    for (var i = 0; i < storeDetails.length; i++) { 
			if(storeDetails[i].pos == tempo){
		    	return storeDetails[i].usr + "," + storeDetails[i].nm + "," + storeDetails[i].dt + "," + storeDetails[i].tm + "," + storeDetails[i].id;
		}
		}
		
	}*/

	

render() {
	console.log("render")
    return (
	<Grid class="main-body" container>
		
		{this.props.filterVisib &&
		<Grid container item xs={12} justify="center">
			<SearchBar handlerFiltered={this.handlerFiltered}/>
		</Grid>}

		{this.props.sliderVisib &&
		<Grid container item xs justify="flex-end">
				<ToggleButtonGroup value={this.state.sliderBtnChosen} style={{margin : "10px"}} onChange={this.handleToggleBtnChange} exclusive>
					<ToggleButton value="map-view" aligned >
						<MapIcon/>
					</ToggleButton>
					<ToggleButton value="list-view" aligned>
						<ListIcon/>
					</ToggleButton>
				</ToggleButtonGroup>
			
		</Grid>}
		{ this.state.sliderBtnChosen == "map-view" &&
		<Grid id="mapM" container item xs={12}>
			{<MapWrapper meals={this.state.dataMeals} mapCenter={this.state.mapCenter} mapWidth={this.props.mapWidth} infoWindowVisib={this.props.boxesVisib} mealInfoType={this.props.mealInfoType}/>}
		</Grid>
		}
			{ this.state.sliderBtnChosen == "list-view" &&
			<Grid item xs>
			{
				this.state.filtered && (objSorted.values().next().done == false ) && <MealListHeaderCity city={objSorted.values().next().value[0].city} />
			}
			</Grid> &&
			
				<MealList meals={this.state.dataMeals}/>	 
			}
		<button onClick={this.test}>testbtn</button>
		</Grid>
	);
  }
}
export default MapTemplate

//export default MapTemplate;

export function MapTemplateMulti(props){
	//get the meals data
	var data = []
	$.ajax({ url: 'PHPF/getnewmeals.php',
		type: 'post',
		async: false,
		success: function(output){
			console.log(output)
			console.log(typeof(output))
			var d1 = JSON.parse(output)
			console.log(d1)
			d1.forEach((e) =>{
				var parsed = JSON.parse(e);
				data.push(parsed);
			})
		}
	});
	//debug local
	if(window.location.host == "localhost:3000"){
		var s = '[{"host":"harrypotter","title":"ButterBeer","date":"2020-05-23","lat":-0.0013890540182005,"lon":-0.0021765845481588,"time":"18:14:40","id":"110","city":"TimbuckTu"},{"host":"marveel2@hotmail.com","title":"PIZZA NIGHT!","date":"2020-05-06","lat":55.950926774582,"lon":-3.2200511488097,"time":"16:51:05","id":"130","city":"Edinburgh"}]';
		var data = JSON.parse(s)
	}
	console.log(data);

	return(
		<MapTemplate data={data} mapWidth={100} sliderVisib={props.sliderVisib} filterVisib={props.filterVisib} boxesVisib={props.boxesVisib} mealInfoType={mealInfoEnum.DATE}/>
	)
}


export function MapTemplateSingle(props){
	var data = [];
	console.log(props)
	if(props.precise){
		console.log("precise")
		$.ajax({ url: 'PHPF/getinfomeal.php',
			type: 'post',
			async: false,
			data : {"id" : props.mealId},
			success: function(output){
				console.log(output)
				console.log(typeof(output))
				if(output == "{}"){ //have to check that the call was successful
					console.log("no meal retreived")
					return;
				}
				var parsed = JSON.parse(output)
				data.push(parsed);

				console.log(parsed)
				/*d1.forEach((e) =>{
					var parsed = JSON.parse(e);
					data.push(parsed);
				})*/
			},
			error: function(){
				console.log("problem in retreiving the specific meal with address")
			}
		});
	}
	else{
		console.log("public")
		$.ajax({ url: 'PHPF/getpublicmeal.php',
			type: 'post',
			async: false,
			data : {"id" : String(props.mealId)},
			success: function(output){
				console.log("a" + output + "b")
				console.log(typeof(output))
				if(output == "{}"){
					console.log("no meal retreived")
					return;
				}
				var parsed = JSON.parse(output)
				data.push(parsed);

				console.log(parsed)
				/*d1.forEach((e) =>{
					var parsed = JSON.parse(e);
					data.push(parsed);
				})*/
			},
			error: function(){
				console.log("problem in retreiving the specific meal with general info")
			}
		});
	}
	//debug local
	if(window.location.host == "localhost:3000"){
		var s = '{"id":"145","host":"harrypotter","title":"British Roast","time":"16:17:01","date":"2021-01-21","description":"ROAST EM","guest_limit":"4","proposed_meal":"make your own favorite pizza","contribution":"4.5","city":"Edinburgh","dietary":"","theme":"","age_range":"[]","address":"27 Union St","lat":55.950926774582,"lon":-3.2200511488097}'
		data.push(JSON.parse(s));
		console.log(data)
	}
	if(data.length == 0){
		console.log(data)
		return null;
	}
	if(data[0].lat == null || data[0].lon == null){
		console.log("lat/lon null", data[0].lat, data[0].lon)
		return null;
	}
	if(props.precise)
		return <MapTemplate data={data} mapWidth={100} sliderVisib={false} filterVisib={false} boxesVisib={true} mealInfoType={mealInfoEnum.ADDRESS} />
	else 
		return <MapTemplate data={data} mapWidth={100} sliderVisib={false} filterVisib={false} boxesVisib={true} mealInfoType={mealInfoEnum.DATE} />

}
