import React, { useEffect, useState } from 'react';

//useState allows us to remember/store data in a component like when variables change it makes the
//UI change as well

//useEffect allows us to run code when our component loads

//This function component has two state variables
function Metrics(){
    const [metrics, setMetrics] = useState(null); //this will hold our API data when it arrives
    const [loading, setLoading] = useState(null); //this will tell us if we are still waiting for data

   //once the first ocmponent is shown this runs once.
    useEffect(() => {
        fetch("http://localhost:8080/api/metrics") //tells the browser to get data from the Go backend endpoint
        .then(res => res.json()) //when the fetch is complete this turns the HTTP repsonse to JSON so we can use it as an object
        .then(data => {
            console.log('Fetched metrics:',data);
            setMetrics(data); //Save the data
            setLoading(false); //Lets us show that we are done loading 
        })
        .catch(err => {
            console.log("Fetch error:", err);
            setMetrics(null);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading metrics...</div>
    if (!metrics) return <div>Oh no could not fetch metrics.</div>
    
    //Browser will display this if the metrics are available
    return(
        <div>
            <h2>Infra Metrics</h2>
            <ul>
                <li>CPU: {metrics.cpu.toFixed(2)}%</li>
                <li>Memory: {metrics.memory.toFixed(2)} MB</li>
                <li>Requests Per Second: {metrics.requestspersecond.toFixed(2)}</li>
                <li>Time: {metrics.time}</li>
            </ul>
        </div>
    );
 
}

export default Metrics;