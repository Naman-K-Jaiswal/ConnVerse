package feed

import (
	"backend/blog"
	"backend/database"
	"context"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"strconv"
	"time"
)

func LoadFeed() gin.HandlerFunc {
	return func(c *gin.Context) {
		chunk := c.Param("chunk")
		idx, err := strconv.Atoi(chunk)
		if err != nil {
			c.JSON(400, gin.H{"error": "Could not resolve parameters"})
			return
		}
		id := c.Param("id")

		collection := database.DB.Collection("Feeds")
		blogCollection := database.DB.Collection("BlogPosts")
		ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
		defer cancel()

		var feed Feed
		err = collection.FindOne(ctx, bson.M{"userID": id}).Decode(&feed)
		if err != nil {
			c.JSON(400, gin.H{"error": "Error retrieving feed"})
			return
		}

		var blogIDs []string
		if len(feed.BlogIDs) < 10 {
			blogIDs = feed.BlogIDs
		} else {
			blogIDs = feed.BlogIDs[idx : 10+idx]
		}

		var blogs []blog.BlogPost
		for _, bid := range blogIDs {
			var post blog.BlogPost
			err = blogCollection.FindOne(ctx, bson.M{"_id": bid}).Decode(&post)
			if err != nil {
				c.JSON(400, gin.H{"error": "Error retrieving blog post"})
				return
			}
		}

		c.JSON(200, gin.H{"blogs": blogs})
	}
}
