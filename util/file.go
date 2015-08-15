package util

import (
	"io/ioutil"
)

func ReadFileString(filePath string) (string, error) {
	data, err := ioutil.ReadFile(filePath)
	if err != nil {
		return "", err
	}
	return string(data), nil
}

func WriteFileString(filePath string, str string) error {
	return ioutil.WriteFile(filePath, []byte(str), 0777)
}
