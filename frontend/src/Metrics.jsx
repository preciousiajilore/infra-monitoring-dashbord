import React, { useEffect, useState } from 'react';
import loadingGif from "/Users/preciousajilore/Documents/GitHub/infra-monitoring-dashbord/frontend/src/assets/Art Glow GIF by Psyklon.gif";

//useState allows us to remember/store data in a component like when variables change it makes the
//UI change as well

//useEffect allows us to run code when our component loads

//This function component has two state variables
function Metrics(){
    const [metrics, setMetrics] = useState(null); //this will hold our API data when it arrives
    const [loading, setLoading] = useState(true); //this will tell us if we are still waiting for data

   //once the first ocmponent is shown this runs once.
    useEffect(() => {
  const fetchMetrics = () => {
    fetch('http://localhost:8080/api/metrics')
      .then(res => res.json())
      .then(data => {
        setMetrics(data);
        setLoading(false);
      })
      .catch(() => {
        setMetrics(null);
        setLoading(false);
      });
  };
  fetchMetrics(); // initial fetch

  const interval = setInterval(fetchMetrics, 3000); // fetch every 3 seconds

  return () => clearInterval(interval); // cleanup on unmount
}, []);

    if (loading) return <img src={loadingGif} alt = "Loading..."/>;
    if (!metrics) return <div>Oh no could not fetch metrics.</div>;
    
    //Browser will display this if the metrics are available
    return(
        <div style={{ background: "#222", color: "#fff", padding:"1em", borderRadius:"8px"}}>
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