package blog

import (
	"backend/database"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	//"go.mongodb.org/mongo-driver/bson/primitive"
	"context"
	"net/http"
	"time"
)

type EditRequest struct {
	Title           string   `json:"title"`
	Content         string   `json:"content"`
	UserID     	    string   `json:"userId"`
	Image           string   `json:"image"`
	Tags            []string `json:"tags"`
	DeleteCommentID string   `json:"deleteComment"`
}

// EditBlogPost handles the editing of an existing blog post
// DeleteBlogPostByID deletes a blog post by its ID
// EditBlogPost handles the editing of an existing blog post
func EditBlogPost() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Extract postID from URL parameters
		postID := c.Param("id")

		// Validate if postID is a valid ObjectID
		objID, err := primitive.ObjectIDFromHex(postID)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid postID"})
			return
		}
		// Retrieve existing blog post by postID using the RetrieveBlogPostByID handler
		existingPost, err := RetrieveBlogPostByID(objID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve blog post"})
			return
		}

		// Delete the existing post
		err = DeleteBlogPostByID(objID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete existing blog post"})
			return
		}

		// Bind the edit request from JSON payload
		var editRequest EditRequest
		if err := c.ShouldBindJSON(&editRequest); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Update the existing post with the edit request
		existingPost.Title = editRequest.Title
		existingPost.Content = editRequest.Content
		existingPost.Image = editRequest.Image
		existingPost.Tags = editRequest.Tags
		if editRequest.DeleteCommentID != "" {
			err = DeleteCommentByID(objID, editRequest.DeleteCommentID)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete comment"})
				return
			}
		}
		// Update other fields as needed
		// Save the edited post back to the database using the Update handler
		err = Update(existingPost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to edit blog post"})
			return
		}

		c.JSON(http.StatusOK, existingPost)
	}
}

// DeleteCommentByID deletes a comment from a blog post by comment ID
func DeleteCommentByID(postID primitive.ObjectID, commentID string) error {
	// Create a filter based on postID and commentID
	filter := bson.M{"_id": postID, "comments.commentId": commentID}
	// Create an update to pull the comment from the array
	update := bson.M{"$pull": bson.M{"comments": bson.M{"commentId": commentID}}}
	// Update the blog post in MongoDB to remove the comment
	collection := database.DB.Collection("BlogPosts")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	_, err := collection.UpdateOne(ctx, filter, update)
	return err
}
