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


//function to add a reply to a comment
type ReplyRequest struct {
	UserID  string `json:"userId"`
	Content string `json:"content"`
}

// AddReplyToComment adds a reply to a specific comment in a blog post
func AddReplyToComment() gin.HandlerFunc {
	return func(c *gin.Context) {
		postID := c.Param("id")
		commentID := c.Param("commentID")

		// Convert the string post ID and comment ID to BSON ObjectIDs
		postObjectID, err := primitive.ObjectIDFromHex(postID)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid blog post ID"})
			return
		}

		commentObjectID, err := primitive.ObjectIDFromHex(commentID)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid comment ID"})
			return
		}

		var replyRequest ReplyRequest

		if err := c.ShouldBindJSON(&replyRequest); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		newReply := Comment{
			CommentID:   primitive.NewObjectID(),
			UserID:    replyRequest.UserID,
			Content:   replyRequest.Content,
			Timestamp: time.Now(),
		}

		// Update the blog post with the new reply to a specific comment
		filter := bson.M{"_id": postObjectID, "comments.commentId": commentObjectID}
		update := bson.M{"$push": bson.M{"comments.commentId.replies": newReply}}

		collection := database.DB.Collection("BlogPosts")
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		_, err = collection.UpdateOne(ctx, filter, update)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add reply"})
			return
		}

		c.JSON(http.StatusCreated, newReply)
	}
}
