package profile

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func UpdateUserProfile() gin.HandlerFunc {
	return func(c *gin.Context) {
		var updated_user UserUpdate
		if err := c.ShouldBindJSON(&updated_user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		existing_user, err := GetUserByNickName(updated_user.Nickname)
		if err != nil && existing_user != nil && existing_user.Nickname == updated_user.Nickname && existing_user.UserID != updated_user.UserID {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Nickname is not unique"})
			return
		}

		err = UpdateUserInDB(updated_user)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user profile"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "User profile updated successfully"})
	}
}
