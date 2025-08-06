package main

//Loads the packages that Go program neeeds for Https/json
import (
	"encoding/json"
	"net/http"
)

//Define a data shape/structire for the metrics that we will return

type Metrics struct {
	CPU    float64 `json:"cpu"`
	Memory float64 `json:"memory"`
}

// Function that will handle requests to the api/metrics route
// This function will answer web requests and creates a fakd 'metrics" response and sends it as a json
func metricsHandler(w http.ResponseWriter, r *http.Request) {
	m := Metrics{
		CPU:    32.5,   // Pretend value for the CPU usage
		Memory: 6144.0, // Pretend value for Memory (MB)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(m)
}

//This sets up the serve to listwn for requests and start the server port 8080

func main() {
	//When someone visirts /api/metrics, call metricsHandler
	http.HandleFunc("/api/metrics", metricsHandler)

	//Start the web server on port 8080
	http.ListenAndServe(":8080", nil)

}
