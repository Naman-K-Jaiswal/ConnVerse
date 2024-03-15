package authn

import (
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"net/http"
	"os"
	"time"
)

func ForgotPassword() gin.HandlerFunc {
	return func(c *gin.Context) {
		var signup_details SignupDetails
		err := c.ShouldBindJSON(&signup_details)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		code := MatchPass(signup_details.OldPassword, signup_details.Email)
		if code != 0 {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid password"})
			return
		}

		flag, user := CheckUserAlreadyExist(signup_details.Email)
		if flag == false {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}

		err = CreatePassword(signup_details)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"sub": signup_details.Email,
			"exp": time.Now().Add(time.Hour * 24).Unix(),
		})

		tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generating token"})
			return
		}

		c.SetSameSite(http.SameSiteLaxMode)
		c.SetCookie("Authorization", tokenString, 3600*24, "/", "localhost", false, false)

		c.JSON(http.StatusOK, gin.H{"message": "Sign Up Successful!", "img": user.ProfilePhoto, "name": user.Name, "id": user.UserID})
	}
}