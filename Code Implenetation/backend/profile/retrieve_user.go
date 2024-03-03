package profile

import (
	"backend/database"
	"context"
	"log"
	"net/http"
	"fmt"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

// RetrieveUserProfile retrieves a single user profile by ID
func RetrieveUserProfile() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Extract user profile ID from the request parameters
		userID, err := primitive.ObjectIDFromHex(c.Param("id"))
		if err != nil {
			log.Fatal(err)
		}

		// Create a filter based on the ObjectID
		filter := bson.M{"_id": userID}

		// Retrieve the user profile from MongoDB
		var userProfile User
		collection := database.DB.Collection("Users")
		ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
		defer cancel()

		err = collection.FindOne(ctx, filter).Decode(&userProfile)
		if err != nil {
			fmt.Println("Error")
			c.JSON(http.StatusNotFound, gin.H{"error": "User profile not found"})
			return
		}

		c.JSON(http.StatusOK, userProfile)
	}
}

// RetrieveUserProfileByID retrieves a single user profile by ID
func RetrieveUserProfileByID(userID primitive.ObjectID) (User, error) {
	// Create a filter based on the ObjectID
	filter := bson.M{"_id": userID}

	// Retrieve the user profile from MongoDB
	var userProfile User
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	err := collection.FindOne(ctx, filter).Decode(&userProfile)
	if err != nil {
		return User{}, err
	}

	return userProfile, nil
}
