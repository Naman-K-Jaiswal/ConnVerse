package profile

import (
	"backend/database"
	"context"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"time"
)

// RetrieveUserProfile retrieves a single user profile by ID
func RetrieveUserProfile() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Extract user profile ID from the request parameters
		userID := c.Param("id")

		// Create a filter based on the ObjectID
		filter := bson.M{"userid": userID}

		// Retrieve the user profile from MongoDB
		var userProfile User
		collection := database.DB.Collection("Users")
		ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
		defer cancel()

		err := collection.FindOne(ctx, filter).Decode(&userProfile)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "User profile not found"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"user": userProfile})
	}
}
