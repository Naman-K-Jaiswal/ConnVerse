package blog

import (
	"backend/database"
	"context"
	"log"
	"github.com/gin-gonic/gin"
	
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
	filter := bson.M{"_id" : postID}

	// Retrieve the blog post from MongoDB
	var blogPost BlogPost
	vari:= database.DB.Collection("BlogPosts")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	
	err = vari.FindOne(ctx, filter).Decode(&blogPost)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Blog post not found"})
		return
	}

	c.JSON(http.StatusOK, blogPost)
}
}
// RetrieveBlogPostByID retrieves a single blog post by ID
func RetrieveBlogPostByID(postID primitive.ObjectID) (BlogPost, error) {
	// Create a filter based on the ObjectID
	filter := bson.M{"_id": postID}

	// Retrieve the blog post from MongoDB
	var blogPost BlogPost
	collection := database.DB.Collection("BlogPosts")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	err := collection.FindOne(ctx, filter).Decode(&blogPost)
	if err != nil {
		return BlogPost{}, err
	}

	return blogPost, nil
}
