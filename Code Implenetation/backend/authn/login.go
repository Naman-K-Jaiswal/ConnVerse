package authn

import (
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"net/http"
	"os"
	"time"
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
			token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
				"sub": login_details.Email,
				"exp": time.Now().Add(time.Hour * 24).Unix(),
			})

			tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generating token"})
				return
			}

			c.SetSameSite(http.SameSiteLaxMode)
			c.SetCookie("Authorization", tokenString, 3600*24, "/", "localhost", false, true)

			c.JSON(http.StatusOK, gin.H{"message": "Log In Successful!"})
		} else if code == 1 {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email"})
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid password or email"})
		}
	}
}
