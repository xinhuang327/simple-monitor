package util

import (
	"encoding/json"
	"errors"
)

func DecodeJSON(jsonStr string, objPointer interface{}) error {
	err := json.Unmarshal([]byte(jsonStr), objPointer)
	if err != nil {
		return errors.New("DecodeJSON: " + err.Error() + ": " + jsonStr)
	}
	return nil
}

func EncodeToJSON(obj interface{}) (jsonString string, err error) {
	var jsonData []byte
	if jsonData, err = json.MarshalIndent(obj, "", "\t"); err == nil {
		jsonString = string(jsonData)
	}
	return
}
