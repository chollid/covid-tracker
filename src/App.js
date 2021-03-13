// import React, { useState, useEffect } from 'react';
// import {
//   MenuItem,
//   FormControl,
//   Select,
//   Card,
//   CardContent,
// } from '@material-ui/core';
// import  InfoBox from './components/InfoBox';
// import Map from './components/Map';
// import Table from './components/Table';
// import LineGraph from './components/LineGraph';
// import './css/App.css';
// import './css/Table.css';
// import { sortData, prettyPrintStat } from './util';
// import "leaflet/dist/leaflet.css";


// function App() {

//   /** Declare state and set components initial state/useState**/
//   const [countries, setCountries] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState
//   ("worldwide");
//   const [countryInfo, setCountryInfo] = useState({});
//   const [tableData, setTableData] = useState([]);
//   const [mapCenter, setMapCenter] = useState({ lat: 24.25, lng: -76.0 });
//   const [mapZoom, setMapZoom] = useState(3);
//   const [mapCountries, setMapCountries] =useState([])
//   const [casesType, setCasesType] = useState('cases')


//   useEffect(() => {
//       fetch("https://disease.sh/v3/covid-19/all")
//       .then((response) => response.json())
//       .then((data) => {
//         setCountryInfo(data)
//       })
//   }, [])

//   useEffect(() => {
//     //Code here will run **only** once when the component loads
//     //Will be "async"= send request, waits for it, do something with it.
//     //Inside the async is the "promise"
//     const getCountriesData = async () => { 
//       await fetch("https://disease.sh/v3/covid-19/countries")
//       .then((response) => response.json())
//       .then((data) => {
//         const countries = data.map((country) => ( //countries is a huge array now
//           {
//             name: country.country, //ex. "Afghanistan"
//             value: country.countryInfo.iso2 //"AF"
//           }))

//           const sortedData = sortData(data);
//           setTableData(sortedData)
//           setMapCountries(data)
//           setCountries(countries) 
//       })
//     }
   
//     getCountriesData(); //Call the function
//   }, [])

//   const onCountryChange = async (event) => {
//     const countryCode = event.target.value
//     // setSelectedCountry(countryCode);

//     const url = countryCode === "worldwide" 
//     ? "https://disease.sh/v3/covid-19/all" 
//     : `https://disease.sh/v3/covid-19/countries/${countryCode}`

//     await fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       setSelectedCountry(countryCode)
//       //data is the whole object returned from API
//       setCountryInfo(data)

//       setMapCenter([data.countryInfo.lat, data.countryInfo.long])
//       setMapZoom(4)
      
//     })
//   }
//   console.log("Mapp Stuff -->>>>>", mapCenter, mapZoom)
//   console.log("Country Info >>>>>", countryInfo)
//   console.log("Cases Type >>>>>", casesType)


//   return (
//     <div className="app">
//       <div className="app__left">
//         <div className="app__header">

//           <h1>Covid-19 Tracker</h1>
//           <FormControl className="app__dropdown">

//             <Select variant="outlined" onChange={onCountryChange} value={selectedCountry}>
//                 <MenuItem value="worldwide">Worldwide</MenuItem>
//                 {countries.map(country => (
//                   <MenuItem value={country.value}>{country.name}</MenuItem>
//                 ))}
//             </Select>

//           </FormControl>
//         </div>
//         {/****Info Boxes on top with todays and total categories */}
//         <div className="app__stats">
//           <InfoBox onClick={e => setCasesType('cases')} 
//           title="Coronavirus Cases" 
//           cases={prettyPrintStat(countryInfo.todayCases)} 
//           total={prettyPrintStat(countryInfo.cases)}/>

//           <InfoBox onClick={e => setCasesType('recovered')} 
//           title="Recovered" 
//           cases={prettyPrintStat(countryInfo.todayRecovered)} 
//           total={prettyPrintStat(countryInfo.recovered)}/>

//           <InfoBox onClick={e => setCasesType('deaths')} 
//           title="Deaths" 
//           cases={prettyPrintStat(countryInfo.todayDeaths)} 
//           total={prettyPrintStat(countryInfo.deaths)}/>  
//         </div>

//         {/* Map */}
//         <Map 
//           casesType={casesType}
//           countries={mapCountries} 
//           center={mapCenter}
//           zoom={mapZoom}
//         />
//       </div>
//       <Card className="app__right">
//         <CardContent>
//           <h3>Live Cases by Country</h3>
//           <Table countries={tableData} />
//           <h3>Worldwide new {casesType} </h3>
//           {/* Graph */}
//           <LineGraph casesType={casesType} />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default App;


//**************************************

import React, { useState, useEffect } from "react";
import "./css/App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./components/InfoBox";
import LineGraph from "./components/LineGraph";
import Table from "./components/Table";
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./components/Map";
import "leaflet/dist/leaflet.css";

const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  console.log(casesType);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;