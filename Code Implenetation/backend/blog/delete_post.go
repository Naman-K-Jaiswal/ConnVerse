package blog

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
)

func DeleteBlogPost() gin.HandlerFunc {
	return func(c *gin.Context) {
		postID := c.Param("id")

		objID, err := primitive.ObjectIDFromHex(postID)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid postID"})
			return
		}

		err = DeleteBlogPostByID(objID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete blog post"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Blog post deleted successfully"})
	}
}
