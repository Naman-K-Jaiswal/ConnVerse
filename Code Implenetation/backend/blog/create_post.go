package blog

import (
	"backend/database"
	"context"
	"log"
	"net/http"
	"time"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/bson"
)
type CreateBlogPostRequest struct {
	Title   string   `json:"title"`
	Content string   `json:"content"`
	Image   string   `json:"image"`
	UserID  string   `json:"userId"`
	Tags    []string `json:"tags"`
}
// Insert the new post into MongoDB
func Update(newPost BlogPost) error {
	collection := database.DB.Collection("BlogPosts")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_, err := collection.InsertOne(ctx, newPost)
	if err != nil {
		log.Fatal(err)
		return err
	}
	return nil
}

// handles the creation of a new post
func CreateBlogPost() gin.HandlerFunc {
	return func(c *gin.Context) {
		var newPostReq CreateBlogPostRequest
		if err := c.ShouldBindJSON(&newPostReq); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		//log.Println("Received payload:", newPost)
		newPost := BlogPost{
			ID:        primitive.NewObjectID(),
			Title:     newPostReq.Title,
			Content:   newPostReq.Content,
			Image:     newPostReq.Image,
			UserID:    newPostReq.UserID,
			Timestamp: time.Now(),
			Likes:     0,
			Dislikes:  0,
			Comments:  []Comment{},
			Tags:      newPostReq.Tags,
			LikedBy:   []string{},
			DislikedBy: []string{},
		}
		// Add the new blogpost to the DB and return it in JSON format	

		err := Update(newPost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create blog post"})
			return
		}
		
		c.JSON(http.StatusCreated, newPost)
	}
}
// DeleteBlogPostByID deletes a blog post by its ID
func DeleteBlogPostByID(postID primitive.ObjectID) error {
	collection := database.DB.Collection("BlogPosts")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := collection.DeleteOne(ctx, bson.M{"_id": postID})
	return err
}
