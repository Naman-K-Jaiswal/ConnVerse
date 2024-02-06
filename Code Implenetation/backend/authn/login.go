package authn

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func Login() gin.HandlerFunc {
	return func(c *gin.Context) {
		var login_details LoginDetails

		err := c.ShouldBindJSON(&login_details)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		DeleteEntries(login_details.Email, 6)

		code := MatchPass(login_details.Password, login_details.Email)

		if code == 0 {
			c.JSON(http.StatusOK, gin.H{"message": "Log In Successful!"})
		} else if code == 1 {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email"})
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid password"})
		}
	}
}
