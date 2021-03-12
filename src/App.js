import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from '@material-ui/core';
import  InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import LineGraph from './components/LineGraph';
import './css/App.css';
import './css/Table.css'
import { sortData } from './util';
import "leaflet/dist/leaflet.css";


function App() {

  /** Declare state and set components initial state/useState**/
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState
  ("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 24.25, lng: -76.0 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] =useState([])


  useEffect(() => {
      fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data)
      })
  }, [])

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

          const sortedData = sortData(data);
          setTableData(sortedData)
          setMapCountries(data)
          setCountries(countries) 
      })
    }
   
    getCountriesData(); //Call the function
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value
    // setSelectedCountry(countryCode);

    const url = countryCode === "worldwide" 
    ? "https://disease.sh/v3/covid-19/all" 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setSelectedCountry(countryCode)
      //data is the whole object returned from API
      setCountryInfo(data)

      setMapCenter([data.countryInfo.lat, data.countryInfo.long])
      setMapZoom(4)
      
    })
  }
  console.log("Mapp Stuff -->>>>>", mapCenter, mapZoom)
  console.log("Country Info >>>>>", countryInfo)

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">

          <h1>Covid-19 Tracker</h1>
          <FormControl className="app__dropdown">

            <Select variant="outlined" onChange={onCountryChange} value={selectedCountry}>
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
            </Select>

          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox  title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>

          <InfoBox  title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>

          <InfoBox  title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>  
        </div>

        {/* Map */}
        <Map 
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
          {/* Graph */}
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
