package blog

import (
	"backend/database"
	"context"
	"github.com/gin-gonic/gin"
	"log"

	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// GetBlogPost retrieves a single blog post by ID
func RetrieveBlogPost() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Extract blog post ID from the request parameters
		postID, err := primitive.ObjectIDFromHex(c.Param("id"))
		// fmt.Println(postID)
		if err != nil {
			log.Fatal(err)
		}
		//Create a filter based on the ObjectID
		filter := bson.M{"_id": postID}

		// Retrieve the blog post from MongoDB
		var blogPost BlogPost
		vari := database.DB.Collection("BlogPosts")
		ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
		defer cancel()

		err = vari.FindOne(ctx, filter).Decode(&blogPost)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Blog post not found"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"blog": blogPost})
	}
}
