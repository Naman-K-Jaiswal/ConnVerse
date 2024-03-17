package profile

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"net/http"
	"os"
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

		tokenStr, err := c.Cookie("Authorization")
		if err != nil {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(os.Getenv("SECRET")), nil
		})

		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			err = UpdateUserInDB(updated_user, claims["sub"].(string))
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user profile"})
				return
			}

			c.JSON(http.StatusOK, gin.H{"message": "User profile updated successfully"})
		} else {
			c.AbortWithStatus(http.StatusUnauthorized)
		}
	}
}
