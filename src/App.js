import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import './App.css';

function App() {

  /** Declare state and set components initial state/useState**/
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("worldwide")

  //Need to make a call to disease API 
  //Will use "useEffect" = "useEffect" runs a piece of code
  //based on a given condition (the brackets at the end).
  //It will run again when that condition "[]" changes.
  
  useEffect(() => {
    //Code here will run **only** once when the component loads
    //Will be "async"= send request, waits for it, do something with it.
    //Inside the async is the "promise"
    
    const getCountriesData = async () => {
      
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ( //countries is a huge array now
          {
            name: country.country, //ex. "Afghanistan"
            value: country.countryInfo.iso2 //"AF"
          }))
          setCountries(countries) //Changes the state, renders new countries from api
      })
    }
    getCountriesData(); //Call the function
  }, [])



  return (
    <div className="App">
      <div className="app__header">
        <h1>Covid-19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined"value={selectedCountry}>
               <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      {/* Header */}
      {/* Title + Select input dropdown field */}

      {/* InfoBoxes */}
      {/* InfoBoxes */}
      {/* InfoBoxes */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
