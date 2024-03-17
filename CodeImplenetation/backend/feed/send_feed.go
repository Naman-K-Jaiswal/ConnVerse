package feed

import (
	"backend/blog"
	"backend/database"
	"context"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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
		ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
		defer cancel()

		var feed Feed
		err = collection.FindOne(ctx, bson.M{"userid": id}).Decode(&feed)
		if err != nil {
			c.JSON(400, gin.H{"error": "Error retrieving feed"})
			return
		}

		var blogIDs []string
		if len(feed.BlogIDs) < 10 {
			if idx != 0 {
				blogIDs = []string{}
			} else {
				blogIDs = feed.BlogIDs
			}
		} else {
			if len(feed.BlogIDs) < idx*10 {
				c.JSON(200, gin.H{"blogs": []blog.BlogPost{}})
			} else if len(feed.BlogIDs) < 10+(idx*10) {
				blogIDs = feed.BlogIDs[idx*10:]
			} else {
				blogIDs = feed.BlogIDs[idx*10 : 10+(idx*10)]
			}
		}

		var blogs []blog.BlogPost
		for _, bid := range blogIDs {
			id, err := primitive.ObjectIDFromHex(bid)
			if err != nil {
				c.JSON(400, gin.H{"error": "Error retrieving blog post"})
				return
			}
			var post blog.BlogPost
			err = blogCollection.FindOne(ctx, bson.M{"_id": id}).Decode(&post)
			if err != nil {
				c.JSON(400, gin.H{"error": "Error retrieving blog post"})
				return
			}

			blogs = append(blogs, post)
		}

		c.JSON(200, gin.H{"blogs": blogs})
	}
}
