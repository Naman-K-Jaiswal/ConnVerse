package blog

import (
	"backend/database"
	"context"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"time"
)

func SearchBlogPosts() gin.HandlerFunc {
	return func(c *gin.Context) {
		var search_query SearchRequest
		if err := c.ShouldBindJSON(&search_query); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		var posts []BlogPost
		collection := database.DB.Collection("BlogPosts")
		ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
		defer cancel()

		filter := bson.M{}
		filter["title"] = bson.M{"$regex": primitive.Regex{Pattern: search_query.Title, Options: "i"}}

		cursor, err := collection.Find(ctx, filter)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to search blog posts"})
			return
		}
		defer func(cursor *mongo.Cursor, ctx context.Context) {
			err := cursor.Close(ctx)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to search blog posts"})
				return
			}
		}(cursor, ctx)

		for cursor.Next(ctx) {
			var post BlogPost
			err := cursor.Decode(&post)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to search blog posts"})
				return
			}
			posts = append(posts, post)
		}

		c.JSON(http.StatusOK, gin.H{"posts": posts})
	}
}
