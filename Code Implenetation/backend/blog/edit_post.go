package blog

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"net/http"
	"time"
)

func EditBlogPost() gin.HandlerFunc {
	return func(c *gin.Context) {
		postID := c.Param("id")

		objID, err := primitive.ObjectIDFromHex(postID)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid postID"})
			return
		}

		existing_post, err := RetrieveBlogPostByID(objID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve blog post"})
			return
		}

		// Bind the edit request from JSON payload
		var edit_request EditPostRequest
		err = c.ShouldBindJSON(&edit_request)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		var newPost = BlogPost{
			ID:         existing_post.ID,
			Title:      edit_request.Title,
			Content:    edit_request.Content,
			Image:      edit_request.Image,
			AuthorID:   existing_post.AuthorID,
			Timestamp:  time.Now(),
			Likes:      existing_post.Likes,
			Dislikes:   existing_post.Dislikes,
			Comments:   []Comment{},
			Tags:       edit_request.Tags,
			LikedBy:    existing_post.LikedBy,
			DislikedBy: existing_post.DislikedBy,
		}

		for i, comment := range existing_post.Comments {
			if BinarySearch(edit_request.DeleteCommentID, i) == false {
				newPost.Comments = append(newPost.Comments, comment)
			}
		}

		err = UpdateBlogPost(existing_post.ID, newPost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to edit blog post"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Blog post edited successfully"})
	}
}
