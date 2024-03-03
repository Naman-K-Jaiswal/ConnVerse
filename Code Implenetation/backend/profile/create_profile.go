package profile

import (
	"backend/database"
	"context"
	"log"
	"net/http"
	"time"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/bson"
)

type CreateUserRequest struct {
	Name         string   `json:"name"`
	Degree       string   `json:"degree"`
	About        string   `json:"about"`
	Skills       []string `json:"skills"`
	BlogPosts    []string `json:"blogPosts"`
	Credentials  []Credential `json:"credentials"`
	Achievements []string `json:"achievements"`
	Projects     []Project `json:"projects"`
	Courses      []Course  `json:"courses"`
}


// Update inserts the new user profile into MongoDB
func Update(newUser User) error {
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, newUser)
	if err != nil {
		log.Fatal(err)
		return err
	}
	return nil
}

// CreateUserProfile handles the creation of a new user profile
func CreateUserProfile() gin.HandlerFunc {
	return func(c *gin.Context) {
		var newUserReq CreateUserRequest
		if err := c.ShouldBindJSON(&newUserReq); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		newUser := User{
			ID:           primitive.NewObjectID(),
			Name:         newUserReq.Name,
			Degree:       newUserReq.Degree,
			About:        newUserReq.About,
			Skills:       newUserReq.Skills,
			BlogPosts:    newUserReq.BlogPosts,
			Credentials:  newUserReq.Credentials,
			Achievements: newUserReq.Achievements,
			Projects:     newUserReq.Projects,
			Courses:      newUserReq.Courses,
			CreatedAt:    time.Now(),
		}

		err := Update(newUser)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user profile"})
			return
		}

		c.JSON(http.StatusCreated, newUser)
	}
}

// DeleteUserProfileByID deletes a user profile by its ID
func DeleteUserProfileByID(userID primitive.ObjectID) error {
	collection := database.DB.Collection("Users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := collection.DeleteOne(ctx, bson.M{"_id": userID})
	return err
}
