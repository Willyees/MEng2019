import React from 'react';
import ReactDom from 'react-dom'
import { render as renderT, getAllByText, findAllByText, fireEvent, findByTestId, getByTestId, cleanup } from '@testing-library/react';
import App from './App';
import ShowMealTemplate from './views/show-meal';
import {formatTime} from './helperFunctions'
import SearchBar from './components/SearchBar';
import { MapTemplateMulti, MapTemplateSingle } from './views/map';
import LogInTemplate from './views/log-in';
import SignUpTemplate from './views/sign-up';
import CreateMealTemplate from './views/create-meal';
import HomeTemplate from './views/home';

import { mount, shallow, render} from 'enzyme';

import { createShallow } from '@material-ui/core/test-utils'
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

  //add cookies tests
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
})


describe('map page single marker - private info', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    renderT(<MapTemplateSingle precise={true} mealId="166" />, div);
    cleanup();
  })
})

describe('map page multi marker - no info', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    renderT(<MapTemplateMulti mapWidth={100} sliderVisib={false} filterVisib={false} boxesVisib={false}/>);
    cleanup();
  })
})


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

