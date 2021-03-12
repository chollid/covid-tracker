import { formatMs } from '@material-ui/core';
import { FormatListNumberedRtlSharp } from '@material-ui/icons';
import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import numeral from "numeral";


const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function(tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    parser: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: true,
                },
                ticks: {
                    //Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    }
}

function LineGraph({ casesType = 'cases' }) {
    const [data, setData] =useState({})

    
    const buildChartData = (data, casesType="cases") => {
        const chartData = [];
        let lastDataPoint;
        
        //cases is key on API object json return
        for (let date in data.cases) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    //Gets the difference between two dates total cases
                    y: data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    }
    
    useEffect(() => {
        const fetchData = async () => {
           await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then(response => response.json())
            .then(data => {
                //CONSOLE LOG TO SEE WHAT YOU GET!
                console.log("Graph Data >>>>>>>", data)
    
                // Take historical API Data returned from API
                //"cases""deaths""recovered" put into buildChartData 
                let chartData = buildChartData(data, 'cases')
                // Set state to finalized Chart Data
                setData(chartData)
                console.log("Chart Data >>>>>>>>",chartData)
            })
        }
        fetchData();
    }, [casesType])
    
    return (
        <div>
            {/* Line --> data takes in datasets
            which takes in arrays */}
            {/* Optional Chaining */}
            {data?.length > 0 && (
                <Line 
                options={options}
                data={{
                    datasets: [
                        {
                            backgroundColor: "rgba(204, 16, 52, 0.3",
                            borderColor: "#CC1034",
                            data: data,
                        }
                    ]
                }}/>
            )}
        </div>
    )
}

export default LineGraph
