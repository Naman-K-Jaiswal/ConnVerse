package profile

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

// CreateUserProfile handles the creation of a new user profile
func CreateUserProfile() gin.HandlerFunc {
	return func(c *gin.Context) {
		var new_user User
		if err := c.ShouldBindJSON(&new_user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		_, err := AddUserToDB(new_user)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user profile"})
			return
		}

		c.JSON(http.StatusCreated, gin.H{"message": "User profile created successfully"})
	}
}
