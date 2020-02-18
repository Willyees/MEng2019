import React from 'react';
import ReactDom from 'react-dom'
import { render as renderT, getAllByText, findAllByText, fireEvent, findByTestId, getByTestId } from '@testing-library/react';
import App from './App';
import ShowMealTemplate from './views/show-meal';
import {formatTime} from './helperFunctions'
import SearchBar from './components/SearchBar';

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

  it('all fields are empty', () => {
    const { getByText } = renderT(<SearchBar handlerFiltered={mockHandlerFiltered}/>);
    
    const node = getByText('SEARCH');
    //simulate ajax call
    fireEvent.click(node);

    expect($.ajax).not.toBeCalled();
  })

  fit('only city is passed', () => {
    /*
    const component = require('./components/SearchBar')
    //jest.spyOn(SearchBar.prototype, 'testx');
    const { getByPlaceholderText, getByText } = render(<SearchBar handlerFiltered={mockHandlerFiltered}/>);
    
    const city = getByPlaceholderText('City');
    const submit = getByText('SEARCH');
    fireEvent.change(city, { target : {value : 'Edinburgh', name : 'city'}});
    
    fireEvent.click(submit);
    expect(city.value).toBe("Edinburgh");

    
    expect(testx).toBeCalled();*/
    //using enzyme

    const mockedFn = jest.fn();
    const spy = jest.spyOn($, 'ajax').mockImplementation(() => Promise.resolve({ success: true }))
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
