package profile

import (
	"context"
	"github.com/Naman-K-Jaiswal/ConnVerse/database"
	"github.com/Naman-K-Jaiswal/ConnVerse/blog"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		err := collection.FindOne(ctx, filter).Decode(&userProfile)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "User profile not found"})
			return
		}
		
		var blogposts, blogs []string
		ctr := 0
		for _, blogg := range userProfile.BlogPosts {
			if ctr > 3 {
				break
			}
			idd, _ := primitive.ObjectIDFromHex(blogg)
			blogPost, err := blog.RetrieveBlogPostByID(idd)
			if err == nil {
				blogposts = append(blogposts, blogg)
				blogs = append(blogs, blogPost.Title)
			}
			ctr = ctr + 1
		}

		userProfile.BlogPosts = blogposts

		c.JSON(http.StatusOK, gin.H{"user": userProfile, "blogs": blogs})
	}
}
