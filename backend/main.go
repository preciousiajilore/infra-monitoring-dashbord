package main

//Loads the packages that Go program neeeds for Https/json
import (
	"encoding/json"
	"math/rand"
	"net/http"
	"time"
)

//Define a data shape/structire for the metrics that we will return

type Metrics struct {
	CPU               float64 `json:"cpu"`
	Memory            float64 `json:"memory"`
	RequestsPerSecond float64 `json:"requestspersecond"`
	Time              string  `json:"time"`
}

// Function that will handle requests to the api/metrics route
// This function will answer web requests and creates a fakd 'metrics" response and sends it as a json
func metricsHandler(w http.ResponseWriter, r *http.Request) {
	rand.Seed(time.Now().UnixNano())
	m := Metrics{
		CPU:               10 + rand.Float64()*80,     // Pretend value for the CPU usage
		Memory:            1024 + rand.Float64()*8192, // Pretend value for Memory (MB)
		RequestsPerSecond: 100 + rand.Float64()*400,
		Time:              time.Now().Format(time.RFC3339),
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(m)
}

func cpuHandler(w http.ResponseWriter, r *http.Request) {
	c := Metrics{
		CPU:  32,
		Time: time.Now().Format(time.RFC3339),
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(c)
}

//This sets up the serve to listwn for requests and start the server port 8080

func main() {
	//When someone visirts /api/metrics, call metricsHandler
	http.HandleFunc("/api/metrics", metricsHandler)

	http.HandleFunc("/api/cpu", cpuHandler)

	//Start the web server on port 8080
	http.ListenAndServe(":8080", nil)

}
