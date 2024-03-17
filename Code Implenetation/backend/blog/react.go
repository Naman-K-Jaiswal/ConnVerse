package blog

import (
	"backend/database"
	"context"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
	"time"
)

func LikeUnlikeBlogPost() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Extract postID from URL parameters
		postID := c.Param("id")
		var react_request ReactRequest

		if err := c.ShouldBindJSON(&react_request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		userID := react_request.UserID
		// Check the HTTP method to determine like or unlike action
		switch react_request.Action {
		case 1:
			// Update the likes count and add user to likedBy array
			err, i := AddUserToLikedBy(postID, userID)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to like the post"})
				return
			}

			// Respond with a success message or updated post details
			if i == 1 {
				c.JSON(http.StatusOK, gin.H{"message": "Post liked successfully"})
			} else if i == -1 {
				c.JSON(http.StatusOK, gin.H{"message": "Post unliked successfully"})
			} else {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to like the post"})
			}
			break

		case 2:
			// Update the likes count and remove user from likedBy array
			err, i := AddUserToDislikedBy(postID, userID)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to unlike the post"})
				return
			}

			if i == 1 {
				c.JSON(http.StatusOK, gin.H{"message": "Post disliked successfully"})
			} else if i == -1 {
				c.JSON(http.StatusOK, gin.H{"message": "Post undisliked successfully"})
			} else {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to dislike the post"})
			}

			break

		default:
			// Respond with an error for unsupported HTTP methods
			c.JSON(http.StatusMethodNotAllowed, gin.H{"error": "Method not allowed"})
		}
	}
}

// Function to add user to likedBy array
// Function to add user to likedBy array
func AddUserToLikedBy(postID string, userID string) (error, int) {
	objID, err := primitive.ObjectIDFromHex(postID)
	if err != nil {
		return err, 0
	}

	existingPost, err := RetrieveBlogPostByID(objID)
	if err != nil {
		return err, 0
	}
	disliked,err := HasUserDislikedPost(existingPost, userID)
	if err!=nil{
		return err,-1
	}
	if disliked {
		existingPost.DislikedBy= removeUserFromArray(existingPost.DislikedBy, userID)
		existingPost.Dislikes--
		UpdateBlogDisLike(existingPost)
	}
	already,erro := HasUserLikedPost(existingPost, userID)
	if erro!=nil{
		return erro,-2
	}
	if !already {
		existingPost.Likes++
		existingPost.LikedBy = append(existingPost.LikedBy, userID)
		// Update the blog post in MongoDB
		if err := UpdateBlogLike(existingPost); err != nil {
			return err, 0
		}
		return nil, 1
	} else if already {
		existingPost.Likes--
		existingPost.LikedBy = removeUserFromArray(existingPost.LikedBy, userID)
		if len(existingPost.LikedBy) == 0 {
			existingPost.LikedBy = nil
		}
		// If there are no more users who have liked this post, delete it from the database

		// Update the blog post in MongoDB
		if err := UpdateBlogLike(existingPost); err != nil {
			return err, 0
		}

		return nil, -1
	}
	return nil, 0
}

func AddUserToDislikedBy(postID string, userID string) (error, int) {
	objID, err := primitive.ObjectIDFromHex(postID)
	if err != nil {
		return err, 0
	}

	existingPost, err := RetrieveBlogPostByID(objID)
	if err != nil {
		return err, 0
	}
	liked,err := HasUserLikedPost(existingPost, userID)
	if err!=nil{
		return err,0
	}
	if liked {
		existingPost.LikedBy= removeUserFromArray(existingPost.LikedBy, userID)
		existingPost.Likes--
		UpdateBlogLike(existingPost)
	}

	already, err := HasUserDislikedPost(existingPost, userID)
	if err != nil {
		return err, 0
	}
	if !already {
		existingPost.Dislikes++
		existingPost.DislikedBy = append(existingPost.DislikedBy, userID)
		// Update the blog post in MongoDB
		if err := UpdateBlogDisLike(existingPost); err != nil {
			return err, 0
		}

		return nil, 1
	} else if already {
		existingPost.Dislikes--
		existingPost.DislikedBy = removeUserFromArray(existingPost.DislikedBy, userID)
		if len(existingPost.DislikedBy) == 0 {
			existingPost.DislikedBy = nil
		}

		// Update the blog post in MongoDB
		if err := UpdateBlogDisLike(existingPost); err != nil {
			return err, 0
		}
		return nil, -1
	}
	return nil, 0
}

// UpdateBlogLike updates the blog post in MongoDB
func UpdateBlogLike(post BlogPost) error {
	collection := database.DB.Collection("BlogPosts")
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	filter := bson.M{"_id": post.ID}
	update := bson.M{"$set": bson.M{"likes": post.Likes, "likedby": post.LikedBy, "dislikedby": post.DislikedBy}}

	_, err := collection.UpdateOne(ctx, filter, update)
	return err
}

func UpdateBlogDisLike(post BlogPost) error {
	collection := database.DB.Collection("BlogPosts")
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	filter := bson.M{"_id": post.ID}
	update := bson.M{"$set": bson.M{"dislikes": post.Dislikes, "likedby": post.LikedBy, "dislikedby": post.DislikedBy}}

	_, err := collection.UpdateOne(ctx, filter, update)
	return err
}

// HasUserLikedPost checks if the user has already liked the blog post
func HasUserLikedPost(post BlogPost, userID string) (bool, error) {
	// Check if the user's ID is in the likedBy array
	for _, likedUserID := range post.LikedBy {
		if likedUserID == userID {
			return true, nil
		}
	}
	return false, nil
}
func HasUserDislikedPost(post BlogPost, userID string) (bool, error) {
	// Check if the user's ID is in the likedBy array
	for _, dislikedUserID := range post.DislikedBy {
		if dislikedUserID == userID {
			return true, nil
		}
	}
	return false, nil
}
func removeUserFromArray(array []string, userID string) []string {
	// Iterate over the array and create a new array without the specified user
	var newArray []string
	for _, user := range array {
		if user != userID {
			newArray = append(newArray, user)
		}
	}
	return newArray
}