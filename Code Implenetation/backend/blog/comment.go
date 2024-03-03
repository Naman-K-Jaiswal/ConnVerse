package blog

import (
	"context"
	"github.com/gin-gonic/gin"
	"backend/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
	"time"
)

type CommentRequest struct {
	UserID  string `json:"userId"`
	Content string `json:"content"`
}

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

	var commentRequest CommentRequest

	if err := c.ShouldBindJSON(&commentRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newcomment := Comment{
		CommentID:        primitive.NewObjectID(),
		UserID:    commentRequest.UserID,
		Content:   commentRequest.Content,
		Timestamp: time.Now(),
	}

	// Update the blog post with the new comment
	filter := bson.M{"_id": objectID}
	update := bson.M{"$push": bson.M{"comments": newcomment}}

	collection:= database.DB.Collection("BlogPosts")
	ctx,cancel:= context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	
	collection.UpdateOne(ctx, filter, update)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create comment"})
		return
	}
	c.JSON(http.StatusCreated, newcomment)
}
}

