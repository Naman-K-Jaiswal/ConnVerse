package blog

import (
	"backend/database"
	"context"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
	"time"
)

// CreateComment creates a new comment for a blog post
func CreateComment() gin.HandlerFunc {
	return func(c *gin.Context) {
		postID := c.Param("id")

		// Convert the string post ID to a BSON ObjectID
		objectID, err := primitive.ObjectIDFromHex(postID)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid blog post ID"})
			return
		}

		var new_comment Comment

		if err := c.ShouldBindJSON(&new_comment); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Update the blog post with the new comment
		filter := bson.M{"_id": objectID}
		update := bson.M{"$push": bson.M{"comments": new_comment}}

		collection := database.DB.Collection("BlogPosts")
		ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
		defer cancel()

		_, err = collection.UpdateOne(ctx, filter, update)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create comment"})
			return
		}
		c.JSON(http.StatusCreated, gin.H{"message": "Comment added successfully"})
	}
}
