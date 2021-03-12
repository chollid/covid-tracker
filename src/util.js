import React from 'react';
import numeral from 'numeral';
import { Circle, Popup} from 'react-leaflet';


const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        // rbg: "rbg(204, 16, 52",
        // half_op: "rgba(204, 16, 52, 0.5)",
        // multiplier: 800,
        multiplier: 300,
    },
    recovered: {
        hex: "#7dd71d",
        // rgb: "rbg(125,215,29)",
        // half_op: "rgba(125,215, 29, 0.5)",
        // multiplier: 1200,
        multiplier: 500,
    },
    deaths: {
        hex: "#fb4443",
        // rgb: "rbg(251,68,67)",
        // half_op: "rgba(251, 68, 67, 0.5)",
        // multiplier: 2000,
        multiplier: 800,
    },
}

export const sortData = (data) => {
    const sortedData = [...data]

    sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
    return sortedData;
}

// Draw Circles on the map with interactive tooltip
export const showDataOnMap = (data, casesType = 'cases') => (
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div>
                    <div>
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </Popup>
        </Circle>
    ))
)