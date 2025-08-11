import React, { useEffect, useState } from 'react';
import StatusBadge from './components/StatusBadge';
import Counter from './components/Counter';
import "./Metrics.css";
//import loadingGif from "/Users/preciousajilore/Documents/GitHub/infra-monitoring-dashbord/frontend/src/assets/Art Glow GIF by Psyklon.gif";

//useState allows us to remember/store data in a component like when variables change it makes the
//UI change as well

//useEffect allows us to run code when our component loads

//This function component has two state variables
function Metrics({ cpuThreshold = 80, memoryThreshold=10000}){
    const [metrics, setMetrics] = useState(null); //this will hold our API data when it arrives
    const [loading, setLoading] = useState(true); //this will tell us if we are still waiting for data
    const [lastUpdated, setLastUpdated] = useState(null); //this will say when the metrics were last updated
   // const [autoRefresh, setAutoRefresh] = useState(true); //this will control the toggle for 
   //once the first ocmponent is shown this runs once.
   
   const [autoRefresh, setAutoRefresh] = useState(() => {
    const saved = localStorage.getItem('autoRefresh');
    return saved ? JSON.parse(saved) : true; // default true
   });

   const status = (() => {
    if (loading && !metrics) return 'loading';
    if (!loading && !metrics) return 'offline';
    if(lastUpdated) {
      const ageMs = Date.now() - lastUpdated.getTime();
      return ageMs < 10_000 ? 'online' :'offline';
    }
    return 'loading';
  }) ();

    const fetchMetrics = () => {
      setLoading(true);
      fetch('http://localhost:8080/api/metrics')
        .then(res => res.json())
        .then(data => {
          setMetrics(data);
          //setLoading(true);
          setLastUpdated(new Date());
        })
        .catch(() => {
          setMetrics(null);
          //setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        }
        );
    };

   


  //Runs on the first render and sets up auto-refresh
  // Effect A: fetch immediately + (optionally) start/stop the interval

  useEffect(() => {
    
    fetchMetrics(); //Initial fetch
    
    let interval;
    if (autoRefresh){
      interval = setInterval(fetchMetrics, 10000)
    }

    //const interval = setInterval(fetchMetrics, 5000); //Fetch every 5 seconds
    return () => clearInterval(interval); // cleanup old timer when autoRefresh flips or component unmounts
  }, [autoRefresh]);
  //[] means that run this once when the component mounts
  //fetch immediately so the user sees the data ASAP
  // Effect B: persist the toggle so it survives page reloads
  useEffect(() =>
  {
    localStorage.setItem('autoRefresh', JSON.stringify(autoRefresh));
  }, [autoRefresh]);
  //fetchMetrics(); // initial fetch

  //const interval = setInterval(fetchMetrics, 3000); // fetch every 3 seconds

  //return () => clearInterval(interval); // cleanup on unmount
 //[]);

  const highCpu = (metrics?.cpu ?? 0 ) > cpuThreshold;
  const highMem = (metrics?.memory ?? 0) > memoryThreshold;


   //Loading state
   //If we are loading (loading == True) and no data show the loader
   if (loading && !metrics){
    return <div>Loading...</div>
   }
   
   //If we are not loading and no metrics show error message
   if (!loading && !metrics){
    return <div>Oops...no metrics here</div>
   }
    //if (loading) return <div>Loading...</div>;
    //if (!metrics) return <div>Oh no could not fetch metrics.</div>;
    
    //--------------------------UI----------------------------------\\
    //Browser will display this if the metrics are available
    return(
        <div className='metrics-container'>
            <h2>Infra Metrics</h2>
            {/* High CPU Warning */}
            {highCpu && (
              <div className='warning-container'>
             
                ⚠️ High CPU usage detected ({metrics.cpu.toFixed(2)}%)
              </div>
            )}
            {/* High Memory Usage*/}
            {highMem && (
              <div className='warning-container'

              
              >
                ⚠️ High Memory usage detected ({metrics.memory.toFixed(2)} MB)
              </div>

            )}
            <div className='toggle-container'>
              <span>Auto Refresh</span>
              <label className='switch'>
                <input
                type= "checkbox"
                checked = {autoRefresh}
                onChange={() => setAutoRefresh(prev => !prev)}
                />
                <span className='slider round'></span>
              </label>
            </div>
            <ul>
                <li>CPU: <span style = {{ color: ((metrics?.cpu ?? 0) > cpuThreshold ? "#ff552" : 'inherit')}}>{metrics.cpu.toFixed(2)}%</span>
                </li>
                <li>Memory: {metrics.memory.toFixed(2)} MB</li>
                <li>Requests Per Second: {metrics.requestspersecond.toFixed(2)}</li>
                <li>Time: {metrics.time}</li>
            </ul>
            <StatusBadge status = {status}/>
            {/* Last updated line (outside the button) */}
            <p style ={{ opacity: 0.8, marginTop: "0.5em"}}
            >Last updated: {lastUpdated ? lastUpdated.toLocaleString() : '-'}</p>
            {/*Refresh Button */}
            <button className='metrics-button'
              onClick = {fetchMetrics}
              disabled = {loading} //prevents mutiple requests

            >
             {loading ? "Refreshing..." : "Refresh Now"}
             
            </button> 

           
        </div>
    );
 
}

export default Metrics;