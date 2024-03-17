package blog

import (
	"backend/database"
	"context"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"time"
)

func RetrieveBlogPosts() gin.HandlerFunc {
	return func(c *gin.Context) {
		var retrieve_query RetrieveRequest
		if err := c.ShouldBindJSON(&retrieve_query); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		collection := database.DB.Collection("BlogPosts")
		ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
		defer cancel()

		filter := bson.M{}
		filter["authorid"] = retrieve_query.AuthorId

		var blogs []BlogPost
		cursor, err := collection.Find(ctx, filter)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve blog posts"})
			return
		}

		for cursor.Next(ctx) {
			var post BlogPost
			err := cursor.Decode(&post)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve blog posts"})
				return
			}
			blogs = append(blogs, post)
		}

		c.JSON(http.StatusOK, gin.H{"posts": blogs})
	}
}
