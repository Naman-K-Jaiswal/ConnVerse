package feed

import (
	"backend/database"
	"context"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"time"
)

func AddTags() gin.HandlerFunc {
	return func(c *gin.Context) {
		var tag_req TagRequest
		err := c.ShouldBindJSON(&tag_req)
		if err != nil {
			c.JSON(400, gin.H{"error": "Error parsing request"})
			return
		}

		collection := database.DB.Collection("Feeds")
		ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
		defer cancel()

		for _, tag := range tag_req.Tags {
			_, err = collection.UpdateOne(ctx, bson.M{"userid": tag_req.UserID}, bson.M{"$addToSet": bson.M{"tags": tag}})
			if err != nil {
				c.JSON(400, gin.H{"error": "Error updating tags"})
				return
			}
		}

		c.JSON(200, gin.H{"message": "Tags updated"})
	}
}
