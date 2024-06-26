package feed

import (
	"context"
	"errors"
	"github.com/Naman-K-Jaiswal/ConnVerse/blog"
	"github.com/Naman-K-Jaiswal/ConnVerse/database"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"sort"
	"time"
)

func ReloadFeed() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")

		collection := database.DB.Collection("BlogPosts")
		feedCollection := database.DB.Collection("Feeds")
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		cursor, err := collection.Find(ctx, bson.M{})
		if errors.Is(err, mongo.ErrNoDocuments) {
			c.JSON(http.StatusOK, gin.H{"message": "No blog posts found"})
		} else if err != nil {
			c.JSON(400, gin.H{"error": "Error retrieving blog posts"})
			return
		}

		var feed Feed
		err = feedCollection.FindOne(ctx, bson.M{"userid": id}).Decode(&feed)
		if err != nil {
			c.JSON(400, gin.H{"error": "Error retrieving feed"})
			return
		}

		mp := make(map[string]bool)
		for _, s := range feed.Tags {
			mp[s] = true
		}

		var blogs []string
		tgs := make(map[string][]string)

		for cursor.Next(ctx) {
			var post blog.BlogPost
			err := cursor.Decode(&post)
			if err != nil {
				c.JSON(400, gin.H{"error": "Error retrieving feed"})
				return
			}

			blogs = append(blogs, post.ID.Hex())
			tgs[post.ID.Hex()] = post.Tags
		}

		sort.Slice(blogs, func(i, j int) bool {
			return calcScore(tgs, mp, blogs[i]) > calcScore(tgs, mp, blogs[j])
		})

		err = UpdateDB(id, blogs)
		if err != nil {
			c.JSON(400, gin.H{"error": "Error updating feed"})
			return
		}

		c.JSON(200, gin.H{"message": "Feed reloaded"})
	}
}
