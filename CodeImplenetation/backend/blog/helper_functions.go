package blog

import (
	"backend/database"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	"time"
)

func AddPostToDB(newPost BlogPost) (string, error) {
	collection := database.DB.Collection("BlogPosts")
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	res, err := collection.InsertOne(ctx, newPost)
	if err != nil {
		log.Fatal(err)
		return "", err
	}

	id := res.InsertedID.(primitive.ObjectID).Hex()
	return id, nil
}

func RetrieveBlogPostByID(postID primitive.ObjectID) (BlogPost, error) {
	// Create a filter based on the ObjectID
	filter := bson.M{"_id": postID}

	// Retrieve the blog post from MongoDB
	var blogPost BlogPost
	collection := database.DB.Collection("BlogPosts")
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	err := collection.FindOne(ctx, filter).Decode(&blogPost)
	if err != nil {
		return BlogPost{}, err
	}

	return blogPost, nil
}

func DeleteBlogPostByID(postID primitive.ObjectID) error {
	collection := database.DB.Collection("BlogPosts")
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	_, err := collection.DeleteOne(ctx, bson.M{"_id": postID})
	return err
}

func UpdateBlogPost(postID primitive.ObjectID, newPost BlogPost) error {
	collection := database.DB.Collection("BlogPosts")
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	_, err := collection.ReplaceOne(ctx, bson.M{"_id": postID}, newPost)
	return err
}

func BinarySearch(arr []int, target int) bool {
	low, high := 0, len(arr)-1

	for low <= high {
		mid := (low + high) / 2
		midValue := arr[mid]

		if midValue == target {
			return true // Element found, return index and true
		} else if midValue < target {
			low = mid + 1 // Search in the right half
		} else {
			high = mid - 1 // Search in the left half
		}
	}

	return false // Element not found, return -1 and false
}
