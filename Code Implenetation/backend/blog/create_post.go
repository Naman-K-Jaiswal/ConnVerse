package blog

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
	"time"
)

// Insert the new post into MongoDB

// handles the creation of a new post
func CreateBlogPost() gin.HandlerFunc {
	return func(c *gin.Context) {
		var new_post_req BlogPostRequest
		if err := c.ShouldBindJSON(&new_post_req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		new_post := BlogPost{
			ID:         primitive.NewObjectID(),
			Title:      new_post_req.Title,
			Content:    new_post_req.Content,
			Image:      new_post_req.Image,
			AuthorID:   new_post_req.AuthorID,
			Timestamp:  time.Now(),
			Likes:      0,
			Dislikes:   0,
			Comments:   []Comment{},
			Tags:       new_post_req.Tags,
			LikedBy:    []int{},
			DislikedBy: []int{},
		}

		id, err := AddPostToDB(new_post)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create blog post"})
			return
		}

		c.JSON(http.StatusCreated, gin.H{"message": "Blog post created successfully", "id": id})
	}
}
