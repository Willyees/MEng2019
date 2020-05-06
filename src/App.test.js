import React from 'react';
import ReactDom from 'react-dom'
import { render as renderT, getAllByText, findAllByText, fireEvent, findByTestId, getByTestId, cleanup } from '@testing-library/react';
import App from './App';
import ShowMealTemplate from './views/show-meal';
import {formatTime, formatTimeNoSecs, getCookie} from './helperFunctions'
import SearchBar from './components/SearchBar';
import MapTemplate, { MapTemplateMulti, MapTemplateSingle } from './views/map';
import {mealInfoEnum} from './components/MapWrapper';
import LogInTemplate from './views/log-in';
import SignUpTemplate from './views/sign-up';
import CreateMealTemplate from './views/create-meal';
import HomeTemplate from './views/home';
import {Marker, InfoWindow} from 'google-maps-react';
import { mount, shallow, render} from 'enzyme';
import {MealListSingle, MealListHeaderDate} from './components/MealList'

import { createShallow, createMount, createRender } from '@material-ui/core/test-utils'
import $ from 'jquery';

test('renders learn react link', () => {
  const { getAllByText } = renderT(<App />);
  const linkElement = getAllByText(/Meal Time/i);//searching for the text Meal Time. (should be everywherer because is on the nav bar)
  expect(linkElement[0]).toBeInTheDocument();
});

describe('show-meals', () => {
  it('renders wihtout crashing', () => {
    const div = document.createElement('div');
    renderT(<ShowMealTemplate/>, div);
    cleanup();
  })
})

describe('helper functions', () => {
  it('time format for 12 or 24', () => {
    let input = "12:55:13";
    let expected = "12:55 AM"
    let actual = formatTime(input); 
    expect(actual).toBe(expected);
    
    input = "24:02:55";
    expected = "12:02 PM";
    actual = formatTime(input);
    expect(actual).toBe(expected);
  })

  it('time format no secs', () => {
    let input = "12:55:13";
    let expected = "12:55";
    let actual = formatTimeNoSecs(input);
    expect(actual).toBe(expected)
  })

  it('get cookie - full and empty', () => {
    let name = "Username"
    let value = "marveel2@hotmail.com"
    let expiration = (new Date()).getTime() + (1 * 60 * 60 * 1000);//expires in 1 hour
    document.cookie = name + "=" + value + "; expires=" + expiration + "; path=/"; 

    let expected = "marveel2@hotmail.com"
    let actual = getCookie(name)
    expect(actual).toBe(expected)

    //empty cookie
    value = ""
    document.cookie = name + "=" + value + "; expires=" + expiration + "; path=/"; 

    expected = ""
    actual = getCookie(name)
    expect(actual).toBe(expected)
  })
})

describe('SearchBar', () => {
  const mockHandlerFiltered = jest.fn();

  it('all fields are empty - ajax not called', () => {
    const mockedFn = jest.fn();
    let shallowui = createShallow()
    const wrapper = shallowui(<SearchBar handlerFiltered={mockHandlerFiltered}/>).dive();
    const instance = wrapper.instance();
    instance.ajaxCallFilter = mockedFn;
    wrapper.find('#search-button').simulate('click');

    expect(mockedFn).not.toBeCalled();
  })

  it('only city is passed - ajax called', () => {
    /*
    const component = require('./components/SearchBar')
    //const spy = jest.spyOn($, 'ajax').mockImplementation(() => Promise.resolve({ success: true }))
    const { getByPlaceholderText, getByText } = render(<SearchBar handlerFiltered={mockHandlerFiltered}/>);
    
    const city = getByPlaceholderText('City');
    const submit = getByText('SEARCH');
    fireEvent.change(city, { target : {value : 'Edinburgh', name : 'city'}});
    
    fireEvent.click(submit);
    expect(city.value).toBe("Edinburgh");

    
    expect(testx).toBeCalled();*/
    //using enzyme

    const mockedFn = jest.fn();
    
    let shallowui = createShallow()
    const wrapper = shallowui(<SearchBar handlerFiltered={mockHandlerFiltered}/>).dive();
    const instance = wrapper.instance();
    instance.ajaxCallFilter = mockedFn;
    wrapper.find('#search-bar-city').simulate('change', { target : {value : 'Edinburgh', name : 'city'}});
    wrapper.find('#search-button').simulate('click');

    let expected = {city : 'Edinburgh'};
    
    expect(mockedFn.mock.calls[0][0]).toEqual(expected);    
  })

  it('visibility extra fields', () => {
    let shallowui = createShallow()
    const wrapper = shallowui(<SearchBar handlerFiltered={mockHandlerFiltered}/>).dive();

    expect(wrapper.find('#search-bar-city')).toHaveLength(1)
    expect(wrapper.find('#search-bar-title')).toHaveLength(1)
    //hidden default
    expect(wrapper.find('#search-bar-timeframe')).toHaveLength(0)
    expect(wrapper.find('#search-bar-dietarytype')).toHaveLength(0)
    expect(wrapper.find('#search-bar-agerange')).toHaveLength(0)
    expect(wrapper.find('#search-bar-date')).toHaveLength(0)

    //show them
    wrapper.setState({filter_vis : true})
    expect(wrapper.find('#search-bar-timeframe')).toHaveLength(1)
    expect(wrapper.find('#search-bar-dietarytype')).toHaveLength(1)
    expect(wrapper.find('#search-bar-agerange')).toHaveLength(1)
    expect(wrapper.find('#search-bar-date')).toHaveLength(1)
  })
  
  it('all filter passed', () => {
    const mockedFn = jest.fn();
    
    let shallowui = createShallow() 
    const wrapper = shallowui(<SearchBar handlerFiltered={mockHandlerFiltered}/>).dive();
    const instance = wrapper.instance(); 
    //set visible the extra filters, otherwise they cannot be found
    wrapper.setState({filter_vis : true})
    instance.ajaxCallFilter = mockedFn;
    wrapper.find('#search-bar-city').simulate('change', { target : {value : 'Edinburgh', name : 'city'}});
    wrapper.find('#search-bar-title').simulate('change', { target : {value : 'PIZZA NIGHT!', name : 'title'}});
    wrapper.find('#search-bar-date').simulate('change', '09/05/2020');
    wrapper.find('#search-bar-timeframe').simulate('change', { target : {value : 'Dinner', name : 'time'}});
    wrapper.find('#search-bar-dietarytype').simulate('change', { target : {value : 'Vegetarian', name : 'dietary'}});
    //wrapper.find('#search-bar-agerange').children().find('input').simulate('change', { target : {value : "18,25", name : 'age_range'}}); //removed age_range because cannot find the child input to be set the value
    wrapper.find('#search-button').simulate('click')
    let expected = {title : 'PIZZA NIGHT!', city : 'Edinburgh', date : '2020-09-05', time : ["17:01:00","22:59:59"], dietary : 'Vegetarian'}
    expect(mockedFn.mock.calls[0][0]).toEqual(expected)
  })
})


describe('map page single marker - private info', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    renderT(<MapTemplateSingle precise={true} mealId="166" />, div);
    cleanup();
  })

  
})

describe('map page multi marker - no info', () => {
  it('renders without crashing - no info', () => {
    const div = document.createElement('div');
    renderT(<MapTemplateMulti mapWidth={100} sliderVisib={false} filterVisib={false} boxesVisib={false}/>, div);
    cleanup();
  })

})

describe('map page multi marker - with info', () => {
  it('renders wihtout crashing', () => {
    const div = document.createElement('div');
    renderT(<MapTemplateMulti mapWidth={100} sliderVisib={true} filterVisib={true} boxesVisib={true}/>, div);
    cleanup();

  })
  
  it('list view - switch map and list view', () => {
    let mountui = createMount()//have to mount and not only shallowrender because the btn looked for is added in the child component
    const wrapper = mountui(<MapTemplateMulti mapWidth={100} sliderVisib={true} filterVisib={true} boxesVisib={true}/>)
    const map = wrapper.find('.MuiButtonBase-root.MuiToggleButton-root.MuiToggleButtonGroup-grouped').not('.Mui-selected')
    expect(map).toHaveLength(1);//only 1 button should be selected
    
    if(map.prop('value') == 'list-view'){
      map.simulate('click')
      expect(wrapper.find('#mapM')).toHaveLength(0)
    }
    else if(map.prop('value') == 'map-view'){
      expect(wrapper.find('#mapM')).toHaveLength(1)
      map.simulate('click')
      expect(wrapper.find('#mapM')).toHaveLength(0)

    }
    else{
      throw new Error('there shouldnt be different value type of the 2 proposed')
    }
  })

  it('list view number of lists - different and same number of dates', () =>{
    let s = '[{"host":"harrypotter","title":"ButterBeer","date":"2020-05-23","lat":-0.0013890540182005,"lon":-0.0021765845481588,"time":"18:14:40","id":"110","city":"TimbuckTu"},{"host":"marveel2@hotmail.com","title":"PIZZA NIGHT!","date":"2020-05-06","lat":55.950926774582,"lon":-3.2200511488097,"time":"16:51:05","id":"130","city":"Edinburgh"}]';
    let data = JSON.parse(s)
    let mountui = createMount()//have to mount and not only shallowrender because the btn looked for is added in the child component
    const wrapper = mountui(<MapTemplate data={data} mapWidth={100} sliderVisib={true} filterVisib={true} boxesVisib={true} mealInfoType={mealInfoEnum.DATE}/>)
    const map = wrapper.find('.MuiButtonBase-root.MuiToggleButton-root.MuiToggleButtonGroup-grouped')
    const selected = map.find('.Mui-selected')
    expect(map.not('.Mui-selected')).toHaveLength(1);//only 1 button should be selected

    if(selected.prop('value') == 'map-view'){
      map.not('.Mui-selected').simulate('click') //click the listview button
    }
    else if(selected.prop('value') != 'list-view'){
      throw new Error("there shouldnt be more than those 2 types of list buttons")
    }
      //2 different dates
      expect(wrapper.find(MealListSingle)).toHaveLength(2)
      expect(wrapper.find(MealListHeaderDate)).toHaveLength(2)      
  })

  it('list view number of lists - same nuymber of dates', () =>{
    let same_date = '[{"host":"harrypotter","title":"ButterBeer","date":"2020-05-23","lat":-0.0013890540182005,"lon":-0.0021765845481588,"time":"18:14:40","id":"110","city":"TimbuckTu"},{"host":"marveel2@hotmail.com","title":"PIZZA NIGHT!","date":"2020-05-23","lat":55.950926774582,"lon":-3.2200511488097,"time":"16:51:05","id":"130","city":"Edinburgh"}]'
    let data = JSON.parse(same_date)
    let mountui = createMount()//have to mount and not only shallowrender because the btn looked for is added in the child component
    const wrapper = mountui(<MapTemplate data={data} mapWidth={100} sliderVisib={true} filterVisib={true} boxesVisib={true} mealInfoType={mealInfoEnum.DATE}/>)
    const map = wrapper.find('.MuiButtonBase-root.MuiToggleButton-root.MuiToggleButtonGroup-grouped')
    const selected = map.find('.Mui-selected')
    expect(map.not('.Mui-selected')).toHaveLength(1);//only 1 button should be selected

    if(selected.prop('value') == 'map-view'){
      map.not('.Mui-selected').simulate('click') //click the listview button
    }
    else if(selected.prop('value') != 'list-view'){
      throw new Error("there shouldnt be more than those 2 types of list buttons")
    }
    expect(wrapper.find(MealListSingle)).toHaveLength(2)
    expect(wrapper.find(MealListHeaderDate)).toHaveLength(1)

  })
})

/*jest.useFakeTimers();

describe('map public', () =>{

  it('markers on - public', () =>{
    let s = '[{"host":"harrypotter","title":"ButterBeer","date":"2020-05-23","lat":-0.0013890540182005,"lon":-0.0021765845481588,"time":"18:14:40","id":"110","city":"TimbuckTu"},{"host":"marveel2@hotmail.com","title":"PIZZA NIGHT!","date":"2020-05-06","lat":55.950926774582,"lon":-3.2200511488097,"time":"16:51:05","id":"130","city":"Edinburgh"}]';
    let data = JSON.parse(s)
    console.log(mealInfoEnum.DATE)
    let shallowui = createMount() 
    const wrapper = shallowui(<MapTemplate data={data} mapWidth={100} sliderVisib={true} filterVisib={true} boxesVisib={true} mealInfoType={mealInfoEnum.DATE}/>);
    wait1();

    jest.runAllTimers();
    wrapper.update()
    expect(wrapper.find(Marker)).toHaveLength(2)
  })
})


jest.useFakeTimers();
function wait1(){
  console.log("before timer")
  setTimeout(function (){
    console.log("end timer")
  },1000)//have to wait for the map to be loaded - hacky
}
describe('map private', () => {
  it('markers on - private', () => {
    let s = '[{"host":"harrypotter","title":"ButterBeer","date":"2020-05-23","lat":-0.0013890540182005,"lon":-0.0021765845481588,"time":"18:14:40","id":"110","city":"TimbuckTu"},{"host":"marveel2@hotmail.com","title":"PIZZA NIGHT!","date":"2020-05-06","lat":55.950926774582,"lon":-3.2200511488097,"time":"16:51:05","id":"130","city":"Edinburgh"}]';
    let data = JSON.parse(s)
    console.log(mealInfoEnum.DATE)
    let shallowui = createMount() 
    const wrapper = shallowui(<MapTemplate data={data} mapWidth={100} sliderVisib={true} filterVisib={true} boxesVisib={true} mealInfoType={mealInfoEnum.ADDRESS}/>);
    wait1();
    jest.runAllTimers();
    wrapper.update()
    expect(wrapper.find(Marker)).toHaveLength(2)
  })
  
})*/

describe('log in page', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    renderT(<LogInTemplate/>, div);
    cleanup();
  })
})

describe('sign up page', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    renderT(<SignUpTemplate/>, div);
    cleanup();
  })
})

describe('create-meal page', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    renderT(<CreateMealTemplate/>, div);
    cleanup();
  })
})



