package utils

import (
	"encoding/json"
	"net/http"
)

// Message returns formatted message
func Message(status bool, message string) map[string]interface{} {
	return map[string]interface{}{"status": status, "message": message}
}

// Respond sets header
func Respond(w http.ResponseWriter, data map[string]interface{}) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}
