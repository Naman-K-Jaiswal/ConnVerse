// // blog/likeblogpost.go
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
			if err := AddUserToLikedBy(postID, userID); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to like the post"})
				return
			}

			// Respond with a success message or updated post details
			c.JSON(http.StatusOK, gin.H{"message": "Post liked successfully"})

		case 2:
			// Update the likes count and remove user from likedBy array
			if err := AddUserToDislikedBy(postID, userID); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to unlike the post"})
				return
			}

			// Respond with a success message or updated post details
			c.JSON(http.StatusOK, gin.H{"message": "Post unliked successfully"})

		default:
			// Respond with an error for unsupported HTTP methods
			c.JSON(http.StatusMethodNotAllowed, gin.H{"error": "Method not allowed"})
		}
	}
}

// Function to add user to likedBy array
// Function to add user to likedBy array
func AddUserToLikedBy(postID string, userID int) error {
	objID, err := primitive.ObjectIDFromHex(postID)
	if err != nil {
		return err
	}

	existingPost, err := RetrieveBlogPostByID(objID)
	if err != nil {
		return err
	}

	already, err := HasUserLikedPost(existingPost, userID)
	if !already {
		existingPost.Likes++
		existingPost.LikedBy = append(existingPost.LikedBy, userID)
		// Update the blog post in MongoDB
		if err := UpdateBlogLike(existingPost); err != nil {
			return err
		}
	} else if already {
		existingPost.Likes--
		existingPost.LikedBy = removeUserFromArray(existingPost.LikedBy, userID)
		if len(existingPost.LikedBy) == 0 {
			existingPost.LikedBy = nil
		}
		// If there are no more users who have liked this post, delete it from the database

		// Update the blog post in MongoDB
		if err := UpdateBlogLike(existingPost); err != nil {
			return err
		}
	}
	return nil
}

func AddUserToDislikedBy(postID string, userID int) error {
	objID, err := primitive.ObjectIDFromHex(postID)
	if err != nil {
		return err
	}

	existingPost, err := RetrieveBlogPostByID(objID)
	if err != nil {
		return err
	}

	already, err := HasUserDislikedPost(existingPost, userID)
	if !already {
		existingPost.Dislikes++
		existingPost.DislikedBy = append(existingPost.DislikedBy, userID)
		// Update the blog post in MongoDB
		if err := UpdateBlogLike(existingPost); err != nil {
			return err
		}
	} else if already {
		existingPost.Dislikes--
		existingPost.DislikedBy = removeUserFromArray(existingPost.DislikedBy, userID)
		if len(existingPost.DislikedBy) == 0 {
			existingPost.DislikedBy = nil
		}
	}
	return nil
}

// UpdateBlogLike updates the blog post in MongoDB
func UpdateBlogLike(post BlogPost) error {
	collection := database.DB.Collection("BlogPosts")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{"_id": post.ID}
	update := bson.M{"$set": bson.M{"likes": post.Likes, "likedBy": post.LikedBy, "dislikedBy": post.DislikedBy}}

	_, err := collection.UpdateOne(ctx, filter, update)
	return err
}

// HasUserLikedPost checks if the user has already liked the blog post
func HasUserLikedPost(post BlogPost, userID int) (bool, error) {
	// Check if the user's ID is in the likedBy array
	for _, likedUserID := range post.LikedBy {
		if likedUserID == userID {
			return true, nil
		}
	}
	return false, nil
}
func HasUserDislikedPost(post BlogPost, userID int) (bool, error) {
	// Check if the user's ID is in the likedBy array
	for _, dislikedUserID := range post.DislikedBy {
		if dislikedUserID == userID {
			return true, nil
		}
	}
	return false, nil
}
func removeUserFromArray(array []int, userID int) []int {
	// Iterate over the array and create a new array without the specified user
	var newArray []int
	for _, user := range array {
		if user != userID {
			newArray = append(newArray, user)
		}
	}
	return newArray
}
