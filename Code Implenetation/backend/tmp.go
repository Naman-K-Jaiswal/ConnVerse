package main

import (
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
)

func main() {
	// Replace "your_image_url" with the actual URL of the image
	imageURL := "https://dummyimage.com/16:9x1080/"

	// Make an HTTP GET request to the image URL
	response, err := http.Get(imageURL)
	if err != nil {
		fmt.Println("Error making HTTP request:", err)
		return
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			fmt.Println("Error closing response body:", err)
		}
	}(response.Body)

	// Read the response body
	imageBytes, err := ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
		return
	}

	// Now 'imageBytes' contains the image data as a byte slice ([]byte)
	fmt.Println("Image downloaded successfully. Size:", len(imageBytes), "bytes", imageBytes)
}
