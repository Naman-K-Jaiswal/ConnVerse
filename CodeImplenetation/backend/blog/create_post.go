package blog

import (
	"backend/database"
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
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
			fmt.Println(err.Error())
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		new_post := BlogPost{
			ID:          primitive.NewObjectID(),
			Title:       new_post_req.Title,
			Content:     new_post_req.Content,
			Image:       new_post_req.Image,
			AuthorID:    new_post_req.AuthorID,
			AuthorImage: new_post_req.AuthorImage,
			AuthorName:  new_post_req.AuthorName,
			Timestamp:   time.Now(),
			Likes:       0,
			Dislikes:    0,
			Comments:    []Comment{},
			Tags:        new_post_req.Tags,
			LikedBy:     []string{},
			DislikedBy:  []string{},
		}

		_, err := AddPostToDB(new_post)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create blog post"})
			return
		}

		collection := database.DB.Collection("Users")
		ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
		defer cancel()

		_, err = collection.UpdateOne(ctx, bson.M{"userid": new_post.AuthorID}, bson.M{"$push": bson.M{"blogposts": new_post.ID.Hex()}})
		if err != nil {
			fmt.Println("idhar", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user's blog posts"})
			return
		}

		c.JSON(http.StatusCreated, gin.H{"message": "Blog post created successfully", "blog": new_post})
	}
}
