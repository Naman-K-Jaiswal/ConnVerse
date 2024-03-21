package feed

import (
	"context"
	"github.com/Naman-K-Jaiswal/ConnVerse/blog"
	"github.com/Naman-K-Jaiswal/ConnVerse/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

func calcScore(tgs map[string][]string, mp map[string]bool, id string) int {
	ct := 0
	for _, str := range tgs[id] {
		if mp[str] {
			ct++
		}
	}

	return ct
}

func UpdateDB(userid string, blogs []string) error {
	feedCollection := database.DB.Collection("Feeds")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := feedCollection.UpdateOne(ctx, bson.M{"userid": userid}, bson.M{"$set": bson.M{"blogids": blogs}})
	if err != nil {
		return err
	}

	return nil
}

func FindBlog(id primitive.ObjectID) (blog.BlogPost, error) {
	blogCollection := database.DB.Collection("BlogPosts")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var post blog.BlogPost
	err := blogCollection.FindOne(ctx, bson.M{"_id": id}).Decode(&post)
	if err != nil {
		return post, err
	}

	return post, nil
}
